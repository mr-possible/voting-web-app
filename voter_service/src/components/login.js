import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VoterLogin() {
    const [voterEmail, setVoterEmail] = useState('');
    const [voterPassport, setVoterPassport] = useState('');
    const [voterPubKey, setVoterPubKey] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Authorise the voter
            const response = await fetch('http://127.0.0.1:8082/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: voterEmail, passportNo: voterPassport, voterPublicKey: voterPubKey }),
            });
            if (response.status === 200) {
                /******************* TODO *******************/
                // 2. Show Dashboard to the User                
                navigate("/dashboard", {
                    state: {
                        userEmail: voterEmail,
                        passport: voterPassport,
                        pubKey: voterPubKey
                    }
                });
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <div className="voter-login-form">
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                <form onSubmit={handleSubmit} action="/dashboard" className="box">
                                    <div className="field">
                                        <label htmlFor="voterEmail" className="label">Voter Email Address</label>
                                        <div className="control">
                                            <input
                                                id="voterEmail"
                                                type="email"
                                                placeholder="e.g. abcd@test.com"
                                                value={voterEmail}
                                                className="input"
                                                onChange={(e) => setVoterEmail(e.target.value)}
                                                required />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="voterPassport" className="label">Voter Passport No</label>
                                        <div className="control">
                                            <input
                                                id="voterPassport"
                                                type="password"
                                                className="input"
                                                value={voterPassport}
                                                onChange={(e) => setVoterPassport(e.target.value)}
                                                required />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="voterPubKey" className="label">Voter Public Key (Eth Address)</label>
                                        <div className="control">
                                            <input
                                                id="voterPubKey"
                                                type="password"
                                                className="input"
                                                value={voterPubKey}
                                                onChange={(e) => setVoterPubKey(e.target.value)}
                                                required />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button type="submit" className="button is-success">
                                            Enter
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}