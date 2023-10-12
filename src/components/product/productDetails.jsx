import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import { AspectRatio } from '../AspectRatio';
import ShoppingcartModal from '../modals/shoppingcartModal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Accordion";




function ProductDetails() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    return <div className="loading" style={{ textAlign: 'center' }}><span className="loading loading-spinner text-neutral"></span></div>;
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
        <p style={{ margin: '0' }}>
          <span className={circleClass}></span> immediately available
        </p>
      );
    } else {
      circleClass += ' red';
      return (
        <p style={{ margin: '0' }}>
          <span className={circleClass}></span> not available
        </p>
      );
    }
  };

  return (
    <div className="product-details-container flex">
      <div className="relative" style={{ width: '800px', height: '800px', paddingLeft: '5rem' }}>
        <div className="relative h-full overflow-hidden rounded-lg md:h-full">
          <div className="grid gap-4" style={{ width: '600px', height: '600px' }}>
            <div>
              <AspectRatio ratio={1 / 1}>
                <img
                  src={productData.images[currentIndex]}
                  className="h-full w-full object-contain rounded-lg cursor-pointer"
                  alt={`Product ${currentIndex + 1}`}
                />
              </AspectRatio>
            </div>
            <div className="grid grid-cols-5 gap-4" style={{ marginBottom: '8rem' }}>
              {productData.images.map((image, index) => (
                <div key={index}>
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
      <div className="product-details w-1/2 p-4" style={{ height: '100%' }}>
        <p>{productData.brand}</p>
        <p className="product_title" style={{ fontSize: '32pt', fontWeight: 'bold', margin: '0' }}>{productData.title}</p>
        <p style={{ margin: '0' }}>{productData.category}</p>
        <div className="rating" style={{ display: 'flex' }}>
          <Rating
            count={5}
            value={parseFloat(roundedRating)}
            size={24}
            edit={false}
            isHalf={true}
          />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400" style={{ fontWeight: 'bold', marginTop: '10px' }}>
            {productData.rating} / 5.0
          </p>
        </div>
        <p style={{ marginBottom: '1rem' }}>{productData.description}</p>
        <div className="price_lieferbar" style={{ display: 'flex' }}>
          <div className="price_lieferbar">
            <div className="stat-title" style={{ textDecoration: 'line-through', color: 'black' }}>{(productData.price / (1 - productData.discountPercentage / 100)).toFixed(2)}€</div>
            <div className="stat-value text-black" style={{ color: 'red', fontWeight: 'bold' }}>{productData.price}€</div>
            <div className="stat-desc" style={{ color: 'red' }}>{productData.discountPercentage.toFixed(0)}% sparen</div>
            <div className="stat-desc" style={{ color: 'black' }}>inkl. 19% MwSt.</div>
          </div>
          <div className="availability-text" style={{ paddingLeft: '2rem', paddingTop: '2rem' }}>{getAvailabilityText(productData.stock)}</div>
        </div>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" id="custom-button" onClick={() => setIsModalOpen(true)}>to shopping cart</button>
        <ShoppingcartModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
        <div className="acc" style={{marginRight: '2rem'}}>
        <h1 style={{marginTop: '6rem'}}>Frequently Asked Questions</h1>
        <Accordion type="single" collapsible style={{ color: 'gray'}}>
        <AccordionItem value="item-1">
  <AccordionTrigger className="text-sm">Payment methods</AccordionTrigger>
  <AccordionContent style={{color: 'black'}}>
  We accept common payment methods such as credit cards (Visa, MasterCard, American Express), 
  debit cards and PayPal to make your purchase as convenient as possible.
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-2">
  <AccordionTrigger className="text-sm">Customer support</AccordionTrigger>
  <AccordionContent style={{color: 'black'}}>
  Our dedicated customer service team is always ready to answer your questions and concerns. 
  You can email us at <b>support@protec.com </b>
  We are available Monday to Friday from 9am to 5pm.
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-3">
  <AccordionTrigger className="text-sm">Shipping information</AccordionTrigger>
  <AccordionContent style={{color: 'black'}}>
  The shipping information for our products can be found in the shopping cart during the ordering process. 
  Delivery time varies by destination.
  </AccordionContent>
</AccordionItem>


</Accordion>


        </div>
        
       
      </div>
      


    </div>
  );
}

export default ProductDetails;
