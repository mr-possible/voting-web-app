/*
References for this file:   
    Bulma CSS: https://bulma.io/documentation/
*/

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

export default function Dashboard() {
    const [socket, setSocket] = useState(new WebSocket('ws://localhost:8081'));
    const [electionInProgress, setElectionInProgress] = useState(false);
    const [hasAlreadyVoted, setHasAlreadyVoted] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios
            .post('/voter-details', location.state.data)
            .then((res) => {
                setHasAlreadyVoted(res.data.has_voted);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get('/dashboard')
            .then((res) => {
                console.log('Authenticated Voter has logged in.')
            }).catch(() => {
                navigate("/");
            });
    }, []);


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
                                    {/* Image credits: <a href="https://www.freepik.com/free-vector/foam-fingers-pointing-happy-politician_42675003.htm#query=politician&position=1&from_view=search&track=sph">Image by Verazinha</a> on Freepik */}
                                    <img src={process.env.PUBLIC_URL + "/images/know-candidate.jpg"} alt="Placeholder image" />
                                </figure>
                            </div>
                            <div className="card-content has-text-centered">
                                <div className="content">
                                    Know the candidates before casting vote!
                                </div>
                            </div>
                            <footer className="card-footer">
                                <Link to="/know_candidate" className="title is-4 card-footer-item">Know Candidate</Link>
                            </footer>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    {/* Image credits: <a href="https://www.freepik.com/free-vector/hand-drawing-illustration-election-concept_2803348.htm#query=voting%20cartoon&position=5&from_view=keyword&track=ais">Image by rawpixel.com</a> on Freepik */}
                                    <img src={process.env.PUBLIC_URL + "/images/cast-vote.jpg"} alt="Placeholder image" />
                                </figure>
                            </div>
                            <div className="card-content has-text-centered">
                                <div className="content">
                                    Cast your vote, a single vote can make a difference!
                                </div>
                            </div>
                            <footer className="card-footer has-text-centered">
                                {
                                    hasAlreadyVoted === true ?
                                        (
                                            <Link to="#"
                                                className="title is-4 card-footer-item has-text-danger">Already Voted</Link>
                                        ) :
                                        (
                                            <Link to="/vote"
                                                onClick={votePreCheck}
                                                className="title is-4 card-footer-item">Cast Vote</Link>
                                        )
                                }
                            </footer>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    {/* Image credits: Image by <a href="https://www.freepik.com/free-photo/mystery-box-with-gifts-concept_36298591.htm#query=who%20won&position=18&from_view=search&track=ais">Freepik</a> */}
                                    <img src={process.env.PUBLIC_URL + "/images/who-won.jpg"} alt="Placeholder image" />
                                </figure>
                            </div>
                            <div className="card-content has-text-centered">
                                <div className="content">
                                    Get to know how did you vote turn up for the society!
                                </div>
                            </div>
                            <footer className="card-footer has-text-centered">
                                <Link to="#" className="title is-4 card-footer-item">See Result</Link>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}