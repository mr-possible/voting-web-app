/**
 * References for this file:
 * 
 * 
 * DB connection => https://www.kindsonthegenius.com/db-migrate-simplified-how-to-generate-posgresql-database-from-node-js/
 * 
 */

const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const { sendDataToBlockchain } = require('./contract_service');
const bcrypt = require('bcrypt');

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "sambhavdave",
    password: "sambhav",
    database: "voting_webapp"
});
client.connect();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

/************************************ API ENDPOINTS ************************************/

// Endpoint to check the voter info in order for him/her to be able to vote in the flutter app.
app.post('/check-voter', async (request, response) => {
    const validVoter = {
        passportNoPattern: /^[A-Z]{2}\d{6}$/, //Example: AB123456
        voterPublicKey: /^0x[a-fA-F0-9]{40}$/
    };

    const { email, passportNo, voterPublicKey: voterPubKey } = request.body;

    if (validVoter.passportNoPattern.test(passportNo) &&
        validVoter.voterPublicKey.test(voterPubKey)) {

        try {
            const result = await sendDataToBlockchain('authoriseVoter', voterPubKey);
            response.status(200).json({ message: 'Transaction successful', result });

            let is_voter_exists_query = `SELECT * FROM voter WHERE pubkey = '${voterPubKey}'`;


            let flag = false;
            client.query(is_voter_exists_query, async (err, res) => {
                if (err) {
                    console.log(`Error => ${err.message}`);
                } else {
                    if (res.rowCount > 0) {
                        flag = true;
                    }
                }
                if (flag == false) {
                    /**
                    *   Once authorised, put the voter in the database 
                    *   with initial voting status 
                    *   as false (if already entry is not there). 
                    */
                    let voter_reg_query = `INSERT INTO voter (email, passport, pubkey, has_voted)
                                VALUES ('${bcrypt.hashSync(email, 5)}', '${bcrypt.hashSync(passportNo, 5)}',
                                 '${voterPubKey}', false)`;

                    client.query(voter_reg_query, (err, res) => {
                        if (!err) {
                            console.log('Entry made to the database!');
                        } else {
                            console.log(`Error => ${err.message}`);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error: ', error);
            response.status(500).json({ message: 'Transaction failed', error: error.message });
        } finally {
            client.end;
        }
    } else {
        response.status(400).json({ error: 'Check voter info, that must be either invalid or the voter is in-eligible to vote!' });
    }
});

// Endpoint to start the election
app.post('/start-election', async (request, response) => {
    try {
        const { electionName } = request.body;
        const result = await sendDataToBlockchain('startTheElection', electionName);
        response.status(200).json({ message: 'Transaction successful', result });
    } catch (error) {
        console.error('Error: ', error);
        response.status(500).json({ message: 'Transaction failed', error: error.message });
    }
});

// Endpoint to add the candidate to blockchain voting so that users can choose one of them and vote.
app.post('/add-candidate', async (request, response) => {
    try {
        const { candidateName } = request.body;
        const result = await sendDataToBlockchain('addNewCandidate', candidateName);
        response.status(200).json({ message: 'Transaction successful', result });
    } catch (error) {
        console.error('Error: ', error);
        response.status(500).json({ message: 'Transaction failed', error: error.message });
    }
});

// Endpoint to announce the winner
app.post('/who-is-the-winner', (request, response) => {
    //TODO
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Admin Service is active on port ${PORT}`);
});