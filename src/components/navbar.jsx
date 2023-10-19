import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length >= 3) {
      setError(null);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.length < 3) {
      setError(
        <Box className="alert_box">
          <Alert variant="soft" color="danger" size="md">
            min. 3 Zeichen
          </Alert>
        </Box>
      );
      return;
    }

    onSearch(searchQuery);
  };

  const isProductPage = location.pathname.includes('/productdetails');

  const handleHomeClick = () => {
    setSearchQuery('');
    onSearch('');
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 flex items-center" id="navbar">
        <img src="/assets/logo_new.svg" id="navbar_icon" alt="Nexus Icon"/>
        <span className="self-center text-3xl font-semibold whitespace-nowrap text-black dark:text-black" 
          id="navbar_icontext" >exus
        </span>
      </div>

      
      <div className="error_message">{error}</div>

      {!isProductPage && (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
          <div className="input-group relative">
            <input
              className="input input-bordered w-24 md:w-auto pl-10 rounded-r-lg"
              id="search_field"
              type="text"
              name="search"
              placeholder="Suchen..."
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default Navbar;
