import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { File } from "lucide-react";
import { Button } from "../Button";

class Product extends Component {
  // Methode, um beim Klicken auf "Details" zur oberen Seite zu scrollen
  handleDetailsClick = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const { product } = this.props;

    return (
      // Produktkarte
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          {/* Produktbild */}
          <img src={product.thumbnail} className="card-img-top" alt={product.thumbnail} />
        </figure>
        <div className="card-body">
          {/* Hersteller */}
          <p className="card-manufacturer">{product.brand}</p>
          {/* Produktname */}
          <h2 className="card-title">{product.title}</h2>
          {/* Preis */}
          <p className="card-price">{product.price}€</p>
        </div>
        <div className="card-actions justify-end" id="detail_action">
          {/* Verlinkung zur Produktseite mit "Details" - Button */}
          <Link to={`/productdetails/${product.id}`} id='detail_button' onClick={this.handleDetailsClick}>
            <Button id="detail_buttontext">
              <File className="mr-2 h-6 w-6" />
              Details
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Product;
