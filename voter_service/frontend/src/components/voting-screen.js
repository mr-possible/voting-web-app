/*
References/Credits for this file:   
    Bulma CSS: https://bulma.io/documentation/
*/

import React, { useEffect, useState } from 'react';
import { getDataFromBlockchain, sendDataToBlockchain } from '../services/web3Client';

function VotingScreen() {
    const [candidateCount, setCandidateCount] = useState();
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [selectedCandidateName, setSelectedCandidateName] = useState('');

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

    // Function to handle candidate selection
    const handleSelectCandidate = (candidateId, candidateName) => {
        // Implement your logic here when a candidate is selected
        setSelectedCandidate(candidateId);
        setSelectedCandidateName(candidateName);
    };

    // Function to handle reset button
    const handleReset = () => {
        setSelectedCandidate(null);
        setSelectedCandidateName('');
    };

    // Function to handle candidate vote selection
    const handleCastVote = async (candidateId, candidateName) => {
        console.log("Selected candidate id: " + candidateId);
        console.log("Selected candidate name: " + candidateName);
        //1. Make smart contract function call.
        await sendDataToBlockchain("vote", [candidateId]);

        //TODO
        // 2. After send operation is successful, Show a confirmation dialogue, maybe send email confirmation.

        // 3. Redirect to home screen now, the vote button should be disabled for that user.

        // 4. The user should logout or choose to see that winner if he/she wants.
    };

    return (
        <div className="container">
            <br />
            <div className="columns is-multiline">
                {candidates.map((item, index) => (
                    <div key={index} className="column is-one-third">
                        <div
                            className={`card ${selectedCandidate === index ? 'has-background-success' : ''}`}
                        >
                            <div className="card-content">
                                <p className="title" align="center">{item}</p>
                            </div>
                            <footer className="card-footer">
                                <a
                                    href="#"
                                    className={`card-footer-item ${selectedCandidate === index ? 'has-text-white' : ''
                                        }`}
                                    onClick={() => handleSelectCandidate(index, item)}
                                >
                                    {selectedCandidate === index ? 'You Selected' : 'Select'}
                                </a>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
            <br /><hr className="hr" />
            <div className="columns is-centered is-vcentered">
                <div className="column is-narrow">
                    <div className="buttons has-text-centered">
                        <button
                            className="button is-warning is-large"
                            onClick={handleReset}
                            disabled={selectedCandidate ? false : true}>Reset Choice</button>
                        <button
                            className="button is-info is-large"
                            onClick={() => handleCastVote(selectedCandidate, selectedCandidateName)}
                            disabled={selectedCandidate ? false : true}>Cast Your Vote</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VotingScreen;
