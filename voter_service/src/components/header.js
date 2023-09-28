/*
References/Credits for this file:   
    Bulma CSS: https://bulma.io/documentation/
*/

import React from 'react';
import { Link } from 'react-router-dom'

export default function Header() {
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
                        <Link to="/" className="navbar-item" >Home</Link>
                        <Link to="/aboutme" className="navbar-item">Developer Info</Link>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link to="#" className="button is-light">Log out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    );
}