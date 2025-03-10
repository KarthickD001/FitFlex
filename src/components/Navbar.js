// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>FitFlex</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/workout">Workouts</Link></li>
        <li><Link to="/search">Search</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;