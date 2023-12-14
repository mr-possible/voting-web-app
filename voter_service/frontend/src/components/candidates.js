/*
References/Credits for this file:   
    Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
    React: https://react.dev/learn
    Bulma CSS: https://bulma.io/documentation/
*/

import React, { useEffect, useState } from 'react';
import { getDataFromBlockchain } from '../services/web3Client';

export default function Candidates() {
    const [candidateCount, setCandidateCount] = useState();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        async function fetchCandidatesData() {
            //1. Fetch Candidate Count first
            let count = await getDataFromBlockchain("getCountOfCandidates", []);
            setCandidateCount(count);

            //2. Use the above count to get all added candidates from the blokchain.            
            let temp = [];
            for (let i = 0; i < count; i++) {
                let res = await getDataFromBlockchain("getCandidateData", [i]);
                temp.push(res[0]);
            }
            setCandidates(temp);
        }
        fetchCandidatesData();
    }, []);

    return (
        <div className="container">
            <h1 className="title is-1" align="center">Total Number of Candidates: {candidateCount}</h1>
            <h1 className="title is-2" align="center">List of Candidates</h1>

            {candidates.map((item, index) => (
                <div key={index} className="columns">
                    <div className="column">
                        <div className="card is-small">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-128x128">
                                            <img
                                                src="https://bulma.io/images/placeholders/128x128.png"
                                                alt="Candidate Profile Photo" />
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">{item}</p>
                                        <p className="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                                <div className="content">
                                    Sample Description of the candidate.
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}