import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [productId]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? productData.images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === productData.images.length - 1 ? 0 : prevIndex + 1));
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container flex">
      <div className="product-details w-1/2 p-4">
        <p>Name: {productData.title}</p>
        <p>Preis: {productData.price}</p>
        <p>Rabatt: {productData.discountPercentage}</p>
        <p>Neuer Preis: {(productData.price - (productData.price * (productData.discountPercentage / 100))).toFixed(2)}</p>
        <p>Bewertung: {productData.rating}</p>
        <p>Verfügbar: {productData.stock}</p>
        <p>Marke: {productData.brand}</p>
        <p>Kategorie: {productData.category}</p>
      </div>
      <div className="relative">
        <div className="relative h-full overflow-hidden rounded-lg md:h-full">
          <div className="carousel-inner">
            {productData.images.map((image, index) => (
              <div key={index} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
                <img
                  src={image}
                  className="d-block w-full h-auto p-0"
                  alt={`Product ${index + 1}`}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
          <div class="flex justify-center items-center pt-4">
            <button type="button" class="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev onClick={prevSlide}>
              <span class="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                </svg>
                <span class="sr-only">Previous</span>
              </span>
            </button>
            <button type="button" class="flex justify-center items-center h-full cursor-pointer group focus:outline-none" data-carousel-next onClick={nextSlide}>
              <span class="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                <span class="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
