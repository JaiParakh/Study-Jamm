import React, {Component} from 'react';
import axios from 'axios';
import './navbar.css';
import logo from './../../assets/img/STUDY JAMM.png'
import {Route, Link} from 'react-router-dom';

class Navbar extends Component{

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-md navbar-light fixed-top py-4" id="main-nav">
    <div className="container">
      <Link to="/" className="navbar-brand">
        <img src={logo} />
      </Link>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="navLink">Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="navLink">LogIn</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
            </div>
        );
    }
}

export default Navbar;