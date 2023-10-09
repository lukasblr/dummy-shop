// SearchProducts.jsx
import React, { Component } from 'react';
import Product from './product';

class SearchProducts extends Component {
  state = {
    products: [],
    error: null,
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
          this.setState({ products: [], error: `Keine Produkte gefunden für "${searchQuery}".` });
        } else {
          this.setState({ products: data.products, error: null });
        }
      })
      .catch((error) => {
        this.setState({ error: 'Fehler beim Abrufen der Daten.' });
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.fetchProductsData();
    }
  }

  render() {
    const { products, error } = this.state;

    return (
      <div>
        {error ? (
          <div className="error-message" style={{textAlign: 'center'}}>{error}</div>
        ) : (
          <div className="product_card_container">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchProducts;
