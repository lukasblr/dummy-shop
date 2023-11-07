import React, { Component } from 'react';
import Product from './product';

class SearchProducts extends Component {
  state = {
    products: [], // Zustand für Produktliste
    error: null, // Fehlerzustand
    currentPage: 1, // Aktuelle Seite für die Paginierung
    productsPerPage: 20, // Produkte pro Seite
  };

  componentDidMount() {
    this.fetchProductsData(); // Daten beim Komponentenladen abrufen
  }

  // Funktion zum Abrufen von Produktdaten basierend auf der Suchanfrage
  fetchProductsData() {
    const { searchQuery } = this.props;
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
            products: [], // Setzen der leeren Produkliste, wenn keine Produkte gefunden wurden
            error: (
              <div id="noproducts_error">
                <span>No products found for "{searchQuery}"</span>
              </div>
            ),
          });
        } else {
          this.setState({ products: data.products, error: null }); // Aktualisieren des Produklistenzustands
        }
      })
      .catch((error) => {
        this.setState({ error: 'Fehler beim Abrufen der Daten.' });
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }

  // Funktion zum Verarbeiten des Seitenwechselns
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber }); // Aktualisieren der aktuellen Seite
    window.scrollTo(0, 0); // Zum Seitenanfang scrollen
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.fetchProductsData(); // Daten erneut abrufen, wenn sich die Suchanfrage ändert
      this.setState({ currentPage: 1 }); // Zur ersten Seite zurückkehren
    }
  }

  render() {
    const { products, currentPage, productsPerPage } = this.state;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); // Aktuell angezeigte Produkte
    const searchResultCount = products.length;
    const isAllProducts = searchResultCount === 100; // Prüfen, ob alle Produkte angezeigt werden

    return (
      <div>
        <div className="search-result-message">
          <div className="rounded-frame">
            {isAllProducts ? "Our Products" : `Search Results for "${this.props.searchQuery}"`}
            <div className="result-count">
              {isAllProducts ? "" : `${searchResultCount} Results`}
            </div>
          </div>
        </div>
        <div className="product_card_container">
          {currentProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="pagination">
          <div className="pagination-center">
            {Array.from({ length: Math.ceil(searchResultCount / productsPerPage) }, (_, index) => (
              // Erzeugen von Seitenbuttons für die Paginierung
              <button
                className={`join-item btn custom-button ${index + 1 === currentPage ? 'btn-active' : ''}`}
                key={index}
                onClick={() => this.handlePageChange(index + 1)}
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
