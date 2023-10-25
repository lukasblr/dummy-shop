import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
      setError('min. 3 Zeichen');
      setSearchQuery(''); // Löscht den Suchtext bei einem Fehler
      return;
    }

    onSearch(searchQuery);
  };

  const isProductPage = location.pathname.includes('/productdetails');

  const handleHomeClick = () => {
    setSearchQuery('');
    onSearch('');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 flex items-center" id="navbar">
        <Link to={"/"} className="flex items-center mb-4 sm:mb-0" onClick={handleHomeClick}>
          <img src="/assets/final_logo.svg" id="navbar_icon" alt="Nexus Icon" />
        </Link>
      </div>

      {!isProductPage && (
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
        <div className="input-group relative">
          <input
            className={`input input-bordered w-24 md:w-auto pl-10 rounded-r-lg ${error ? 'error-input' : ''}`}
            id="search_field"
            type="text"
            name="search"
            placeholder={error ? 'Enter at least 3 characters...' : 'Suchen...'}
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
