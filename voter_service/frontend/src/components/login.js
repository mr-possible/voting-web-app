import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VoterLogin() {
    const [voterEmail, setVoterEmail] = useState('');
    const [voterPassport, setVoterPassport] = useState('');
    const [voterPubKey, setVoterPubKey] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Authorise the voter
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        email: voterEmail,
                        passportNo: voterPassport,
                        voterPublicKey: voterPubKey
                    }
                ),
            });
            if (response.status === 200) {
                // 2. Show Dashboard to the User
                axios
                    .get('/dashboard')
                    .then((res) => {
                        navigate("/dashboard", { state: { data: { voterEmail, voterPassport, voterPubKey } } });
                    })
                    .catch(err => {
                        throw err;
                    });
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const styles = {
        backgroundImage: "url('https://images.unsplash.com/photo-1651766013569-e5789b7cdddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3174&q=80",
        minHeight: '100vh',
        marginTop: '-80px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
    }

    return (
        <div className="voter-login-form" style={styles}>
            <section className="hero  is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                <form onSubmit={handleSubmit} className="box">
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
        </div >
    );
}