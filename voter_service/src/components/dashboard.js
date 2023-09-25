import React from 'react';

export default function Dashboard() {
    return (
        <div className="voter-dashboard">
            <h2>Your Vote Matters!</h2>
            <div className="voter-options-container">
                <button className="voter-dashboard-button">Know Your Candidate</button>
                <button className="voter-dashboard-button">Cast Vote</button>
                <button className="voter-dashboard-button">Who Won ?</button>
            </div>
        </div>
    );
}