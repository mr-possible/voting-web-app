import React from 'react';

export default function Header() {
    return (
        <header>
            <nav>
                <div className="logo">Ethereum Voting Service</div>
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </header>
    );
}