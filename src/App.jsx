import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';

import Navbar from './components/navbar'; 
import Footer from './components/footer';
import Header from './components/header';
import ProductDetails from './components/product/productDetails';
import SearchProducts from './components/product/searchProducts';

import './css/product.css';
import './css/header.css';
import './css/navbar.css';
import './css/footer.css';
import './css/modal.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      window.history.pushState({}, '', `/search/${searchQuery}`); // Aktualisieren der URL basierend auf der Suchanfrage
    } else {
      window.history.pushState({}, '', '/'); // Zurücksetzen der URL, wenn keine Suchanfrage vorhanden ist
    }
  }, [searchQuery]);

  const updateSearchQuery = (query) => {
    setSearchQuery(query); // Funktion zum Aktualisieren der Suchanfrage
  };

  return (
    <Router>
      <Navbar onSearch={updateSearchQuery} />
      <Routes>
        <Route path="/" element={
          <div>
            <Header />
            <SearchProducts searchQuery={searchQuery} />
          </div>
        } />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
      </Routes>
      <Footer  />
    </Router>
  );
}

export default App;
