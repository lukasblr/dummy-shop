import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.length < 3) {
      setError('Suchwort muss mindestens 3 Zeichen lang sein.');
      return;
    }

    onSearch(searchQuery);
  };
  const isProductPage = location.pathname.includes('/productdetails');

  return (
    <div className="navbar bg-base-100" id='navbar'>
      <div className="flex-1 flex items-center">
      <img src="/assets/logo.svg" alt="ProTec Icon" width="42" height="38" />
    <Link to="/" className="btn btn-ghost normal-case text-xl" style={{ fontSize: '1.5rem', color: 'white' }}>
      ProTec
    </Link>
        {isProductPage && (
          <Link to="/" className="btn" style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white">
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
            </svg>
            <span style={{ marginLeft: '0px' }}>Home</span>
          </Link>
        )}
      </div>
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
        <div className="input-group relative">
          <input
            className="input input-bordered w-24 md:w-auto pl-10 rounded-r-lg" // Fügen Sie rounded-r-lg hinzu, um das Suchfeld auf der rechten Seite abzurunden
            style={{ color: 'black', borderRadius: '0.375rem 0.375rem 0.375rem 0.375rem' }} // Hier wird das rechte Ende des Eingabefelds manuell abgerundet
            type="text"
            name="search"
            placeholder="Suchen..."
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}/>
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
export default Navbar;
