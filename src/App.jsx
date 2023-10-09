// App.jsx
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'; 
import Footer from './components/footer';
import SearchProducts from './components/searchProducts';
import ProductDetails from './components/productDetails';
import "./index.css";
import "./product.css";

class App extends Component {
  state = {
    searchQuery: '',
  };

  updateSearchQuery = (searchQuery) => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <Router>
        <Navbar onSearch={this.updateSearchQuery} />
        <Routes>
          <Route path='/' element={<SearchProducts searchQuery={searchQuery} />} />
          <Route path='/productdetails/:productId' element={<ProductDetails />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}

export default App;
