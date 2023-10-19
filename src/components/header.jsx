import React, { Component } from 'react';

class Header extends Component {
    state = {  } 
    render() { 
        return (<div className="header">
        <h1 className="header-title" id="main_header">
          <span>Innovation. Trust. Comfort.</span>
        </h1>
        <p className="header-subtitle" id="sub_header">
        Discover unbeatable deals at Nexus - save now!
        </p>
      </div>);
    }
}
 
export default Header;

