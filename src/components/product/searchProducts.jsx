import React, { Component } from 'react';
import Product from './product';

class SearchProducts extends Component {
  state = {
    products: [],
    error: null,
    currentPage: 1,
    productsPerPage: 20,
  };

  componentDidMount() {
    this.fetchProductsData();
  }

  fetchProductsData() {
    const { searchQuery } = this.props;
    const { currentPage, productsPerPage } = this.state;
    let apiUrl = `https://dummyjson.com/products/search?q=${searchQuery}&limit=100`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok for searchQuery: ${searchQuery}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.products.length === 0) {
          this.setState({
            products: [],
            error: (
              <div>
                Keine Produkte gefunden für "{searchQuery}"
              </div>
            ),
          });
        } else {
          this.setState({ products: data.products, error: null });
        }
      })
      .catch((error) => {
        this.setState({ error: 'Fehler beim Abrufen der Daten.' });
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.fetchProductsData();
      this.setState({ currentPage: 1 }); // Zurück zur ersten Seite bei Änderung der Suchanfrage
    }
  }

  render() {
    const { products, error, currentPage, productsPerPage } = this.state;

    // Berechnung des Indexbereichs für die anzuzeigenden Produkte
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const renderProducts = currentProducts.map((product) => (
      <Product key={product.id} product={product} />
    ));

    return (
      <div>
        {error ? (
          <div>
            {error}
          </div>
        ) : (
          <div className="product_card_container">
            {renderProducts}
          </div>
        )}
        <div className="pagination">
          <div className="pagination-center">
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
              <button
                className={`join-item btn custom-button ${index + 1 === currentPage ? 'btn-active' : ''}`}
                key={index}
                onClick={() => this.setState({ currentPage: index + 1 })}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchProducts;
