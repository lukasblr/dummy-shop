import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'; 
import Footer from './components/footer';
import SearchProducts from './components/product/searchProducts';
import ProductDetails from './components/product/productDetails';
import "./index.css";
import "./product.css";
import "./header.css";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

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
      <Theme> {/* Theme umhüllt die gesamte Anwendung */}
        <Router>
          <Navbar onSearch={this.updateSearchQuery} />
          <Routes>
            <Route path='/' element={
              <div className="header"> 
                <h1 className="mb-0 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Herbstfreuden</span>
                </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Unsere besten Angebote für Sie!</p>
                <SearchProducts searchQuery={searchQuery} />
              </div>
            } />
            <Route path='/productdetails/:productId' element={<ProductDetails />} />
          </Routes>
          <Footer />
        </Router>
      </Theme>
    );
  }
}

export default App;
