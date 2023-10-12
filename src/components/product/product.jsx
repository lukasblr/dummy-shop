// Product.jsx
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {
  render() {
    const { product } = this.props;

    return (
      <div className="card w-96 bg-base-100 shadow-xl" style={{ width: '15rem', height: '30rem' }}>
        <figure>
          <img src={product.thumbnail} className="card-img-top" alt={product.title} style={{ height: '250px', objectFit: 'cover' }}/>
        </figure>
        <div className="card-body">
          <p className="card-manufacturer" style={{ textAlign: 'left' }}>{product.brand}</p>
          <h2 className="card-title" style={{ textAlign: 'left', fontWeight: 'bold' }}>{product.title}</h2>
          <p className="card-price" style={{ textAlign: 'left' }}>{product.price}€</p>
        </div>
        <div className="card-actions justify-end" style={{ marginBottom: '15px' }}>
          <Link to={`/productdetails/${product.id}`} className='btn btn-secondary' id='details_button' style={{ display: 'flex', alignItems: 'center', color: 'black', height: '40px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="M300-360h60v-160h-60v50h-60v60h60v50Zm100-50h320v-60H400v60Zm200-110h60v-50h60v-60h-60v-50h-60v160Zm-360-50h320v-60H240v60Zm80 450v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0-33-23.5 56.5T800-200H640v80H320ZM160-280h640v-480H160v480Zm0 0v-480 480Z"/>
            </svg>
            Details
          </Link>
        </div>
      </div>
    );    
  }
}
export default Product;
