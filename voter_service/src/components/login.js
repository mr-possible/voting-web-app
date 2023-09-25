import React, { useState } from 'react';

export default function VoterLogin() {
    const [voterEmail, setVoterEmail] = useState('');
    const [voterPassport, setVoterPassport] = useState('');
    const [voterPubKey, setVoterPubKey] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to the backend)
        console.log('Voter Email Address: ', voterEmail);
        console.log('Voter Passport No: ', voterPassport);
        console.log('Voter Pub Key: ', voterPassport);
    };

    return (
        <div className="voter-login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Voter Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={voterEmail}
                        onChange={(e) => setVoterEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passport">Voter Passport No:</label>
                    <input
                        type="password"
                        id="passport"
                        value={voterPassport}
                        onChange={(e) => setVoterPassport(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pubkey">Voter Public Key (Voter's Address):</label>
                    <input
                        type="text"
                        id="pubkey"
                        value={voterPubKey}
                        onChange={(e) => setVoterPubKey(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}