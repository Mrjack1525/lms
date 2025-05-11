import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images/openlibrary-logo.png" alt="Open Library" className="logo" />
        <span className="logo-text">LIBRARY</span>
      </div>

      <ul className="nav-links">
        <li><a href="#">My Books</a></li>
        <li className="dropdown">
          <a href="#">Browse ▼</a>
          <ul className="dropdown-menu">
            <li><a href="#">Trending</a></li>
            <li><a href="#">Classic</a></li>
            <li><a href="#">Genres</a></li>
          </ul>
        </li>
      </ul>

      <div className="navbar-right">
        <div className="search-bar">
          <select>
            <option value="all">All</option>
          </select>
          <input type="text" placeholder="Search" />
          <button>🔍</button>
        </div>
        <div className="icons">
          <img src="/images/user-icon.png" alt="User" className="icon" />
          <div className="hamburger">☰</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
