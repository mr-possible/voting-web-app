/*
References/Credits for this file:   
    Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
    React: https://react.dev/learn
    Bulma CSS: https://bulma.io/documentation/
*/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        axios
            .get('/logout')
            .then(() => {
                navigate("/");
            })
            .catch(err => {
                throw err;
            });
    }

    const isWelcomePage = location.pathname === '/';

    return (
        <header className="header">
            <nav className="navbar is-link" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <h1 className="title is-3 has-text-white">ETH Voting App</h1>
                    </Link>
                    <a
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample" >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        {/* <Link to="/" className="navbar-item" >Home</Link> */}                        
                        <Link to="/aboutme" className="navbar-item">Developer Info</Link>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button
                                    onClick={handleLogout}
                                    className={isWelcomePage ? "button is-light is-hidden" : "button is-light"}>Log out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header >

    );
}