// Product.jsx
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { File } from "lucide-react";
import { Button } from "../Button";

class Product extends Component {
  render() {
    const { product } = this.props;

    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={product.thumbnail} className="card-img-top" alt={product.thumbnail}/>
        </figure>
        <div className="card-body">
          <p className="card-manufacturer">{product.brand}</p>
          <h2 className="card-title">{product.title}</h2>
          <p className="card-price">{product.price}€</p>
        </div>
        <div className="card-actions justify-end" id="detail_action">
          <Link to={`/productdetails/${product.id}`} id='detail_button'>
            <Button id="detail_buttontext">
              <File className="mr-2 h-6 w-6"/> 
                Details
            </Button>
          </Link>
        </div>
      </div>
    );    
  }
}
export default Product;
