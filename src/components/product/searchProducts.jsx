import React, { Component } from 'react';
import Product from './product';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';

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
              <div id="noproducts_error">
                <Box id="noproducts_errorbox">
                  <Alert variant="soft" color="danger" size="md">No products found for "{searchQuery}"</Alert>
                </Box>
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
    const { products, currentPage, productsPerPage } = this.state;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
    // Count of search results
    const searchResultCount = products.length;
    const isAllProducts = searchResultCount === 100;
  
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
