import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import { AspectRatio } from '../AspectRatio';
import ShoppingcartModal from '../modals/shoppingcartModal';
import Product from './product';

function ProductDetails() {
  // Extrahieren der Produkt-ID aus den Routenparametern
  const { productId } = useParams();

  // Zustände für Produktinformationen, aktuellen Index, Modal und ähnliche Produkte
  const [productData, setProductData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  // Datenabruf beim Laden der Komponente basierend auf der Produkt-ID
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [productId]);

  // Ähnliche Produkte abrufen, wenn Produktinformationen verfügbar sind
  useEffect(() => {
    if (productData) {
      fetchSimilarProducts(productData.category).then((data) => setSimilarProducts(data));
    }
    setCurrentIndex(0);
  }, [productData]);

  if (!productData) {
    // Anzeige eines Ladezustands, bis Produktinformationen verfügbar sind
    return <div className="loading"><span className="loading loading-spinner text-neutral"></span></div>;
  }

  const roundRating = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2;
    return roundedRating.toFixed(1);
  };
  const roundedRating = roundRating(productData.rating);

  const getAvailabilityText = (stock) => {
    let circleClass = 'circle';
    if (stock > 0) {
      circleClass += ' green';
      return (
        <p>
          <span className={circleClass}></span> immediately available
        </p>
      );
    } else {
      circleClass += ' red';
      return (
        <p>
          <span className={circleClass}></span> not available
        </p>
      );
    }
  };

  return (
    // Container für die Produkt-Details
    <div className="product-details-container flex">
      <div className="relative" id="gallery_container">
        <div className="relative h-full overflow-hidden rounded-lg md:h-full">
          <div className="grid gap-4" id="gallery">
            <div>
              {/* Bildergalerie des Produkts */}
              <AspectRatio ratio={1 / 1}>
                <img
                  src={productData.images[currentIndex]}
                  className="h-full w-full object-contain rounded-lg cursor-pointer"
                  alt={`Product ${currentIndex + 1}`}
                />
              </AspectRatio>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {productData.images.map((image, index) => (
                <div key={index}>
                  {/* Thumbnails der Bildergalerie */}
                  <AspectRatio ratio={1 / 1}>
                    <img
                      src={image}
                      className="h-full w-full object-contain rounded-lg cursor-pointer"
                      alt={`Product Thumbnail ${index + 1}`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="product-details w-full p-4">
        <p className="product_brand">{productData.brand}</p>
        <p className="product_title">{productData.title}</p>
        <p className="product_category">{productData.category}</p>
        <div className="rating">
          {/* Bewertungskomponente */}
          <Rating
            count={5}
            value={parseFloat(roundedRating)}
            size={24}
            edit={false}
            isHalf={true}
          />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400" id="rating_text">
            {productData.rating} / 5.0
          </p>
        </div>
        <p className="product_description">{productData.description}</p>
        <div className="price_available">
          <div>
            <div className="stat-title" id="product_oldprice">
              {(productData.price / (1 - productData.discountPercentage / 100)).toFixed(2)}€
            </div>
            <div className="stat-value text-black" id="product_price">
              {productData.price}€
            </div>
            <div className="stat-desc" id="rabatt_desc">
              {productData.discountPercentage.toFixed(0)}% sparen
            </div>
            <div className="stat-desc" id="mws_desc">inkl. 19% MwSt.</div>
          </div>
          <div className="availability-text">{getAvailabilityText(productData.stock)}</div>
        </div>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" id="custom-button" onClick={() => setIsModalOpen(true)}>
          <div className="custom_text">
            <img src="\assets\shopping_bag.svg" id="shoppingbag_icon" alt="Shopping Bag Icon" />Buy
          </div>
        </button>
        <ShoppingcartModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
        <div className="similar-products" id="scrollview">
          <h2>Similar Products</h2>
          <div className="product-list">
            {similarProducts.map((similarProduct) => (
              <div key={similarProduct.id}>
                {/* Darstellung ähnlicher Produkte mit der Product-Komponente */}
                <Product product={similarProduct} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Funktion zum Abrufen ähnlicher Produkte basierend auf der Kategorie
function fetchSimilarProducts(category) {
  return fetch(`https://dummyjson.com/products/category/${category}`)
    .then((response) => response.json())
    .then((data) => data.products);
}

export default ProductDetails;
