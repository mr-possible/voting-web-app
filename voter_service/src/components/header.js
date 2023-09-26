/*
References/Credits for this file:   
    Bulma CSS: https://bulma.io/documentation/
*/

import React from 'react';

export default function Header() {
    return (
        <header className="header">
            <nav className="navbar is-link" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
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
                        <a href="#" className="navbar-item">Home</a>
                        <a href="#" className="navbar-item">Developer Info</a>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a href="#" className="button is-light">Log out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    );
}