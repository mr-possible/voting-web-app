/*
References for this file:   
    Bulma CSS: https://bulma.io/documentation/
*/

import React, { useEffect, useState } from 'react';

const socket = new WebSocket('ws://localhost:8081');

export default function Dashboard() {
    const [electionInProgress, setElectionInProgress] = useState(false);

    useEffect(() => {
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received WebSocket message:', data);
            setElectionInProgress(data['electionInProgress']);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (!socket.OPEN) {
                socket.close();
            }
        }
    });

    const votePreCheck = (e) => {
        if (electionInProgress == false) {
            // Prompt user that admin has not started the election
            alert("Election is not started by the admin yet!");
            e.preventDefault();
        } else {
            // Open Voting Screen
            return true;
        }
    }

    return (
        <>
            <br />
            <div className="container is-fluid">
                <h1 className="title is-4 has-text-centered">Welcome Voter ! What would you like to do ?</h1>
                <div className="columns">
                    <div className="column">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src="{{ asset('images/dashboard-search-book.jpg') }}" alt="Placeholder image" />
                                </figure>
                            </div>
                            <div className="card-content has-text-centered">
                                <div className="content">
                                    Know the candidates before casting vote!
                                </div>
                            </div>
                            <footer className="card-footer">
                                <a href="#" className="title is-4 card-footer-item">Know Candidate</a>
                            </footer>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src="{{ asset('images/dashboard-read-review.jpg') }}" alt="Placeholder image" />
                                </figure>
                            </div>
                            <div className="card-content has-text-centered">
                                <div className="content">
                                    Cast your vote, a single vote can make a difference!
                                </div>
                            </div>
                            <footer className="card-footer has-text-centered">
                                <a href="/voting_page"
                                    onClick={votePreCheck}
                                    className="title is-4 card-footer-item">Cast Vote</a>
                            </footer>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src="{{ asset('images/dashboard-submit-review.jpg') }}" alt="Placeholder image" />
                                </figure>
                            </div>
                            <div className="card-content has-text-centered">
                                <div className="content">
                                    Get to know how did you vote turn up for the society!
                                </div>
                            </div>
                            <footer className="card-footer has-text-centered">
                                <a href="#" className="title is-4 card-footer-item">See Result</a>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}