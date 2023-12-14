/**
 * References for this file:
 * DB connection: https://www.kindsonthegenius.com/db-migrate-simplified-how-to-generate-posgresql-database-from-node-js/
 * Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
 * Express: https://expressjs.com
 */

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { Client } = require('pg');

const secret_key = "csm20-secret-key";
let voter = {};

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

function authJWTToken(request, response, next) {
    const myToken = request.cookies.token;
    try {
        verifiedToken = jwt.verify(myToken, secret_key);
        flag = true;
        next();
    } catch (err) {
        response.status(401).json(
            {
                message: "Unauthorized"
            }
        );
    }
}

/************************************ API ENDPOINTS ************************************/
app.post('/login', async (request, response) => {
    const { email, passportNo, voterPublicKey } = request.body;
    voter = { email, passportNo, voterPublicKey }

    axios
        .post('http://127.0.0.1:8080/check-voter', voter, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            const token = jwt.sign({ data: voter }, secret_key);
            response.cookie("token", token, {
                httpOnly: true,
                secure: true
            });
            response.status(200).json(
                {
                    email: voter.email,
                    message: 'Voter Authorised.'
                }
            );
        })
        .catch((error) => {
            response.status(500).json(
                {
                    error,
                    message: 'Internal Server Error. Please contact election administrator.'
                }
            );
        })
});

app.get('/dashboard', authJWTToken, (req, res) => {
    res.status(200).json(
        {
            message: 'On Dashboard Page'
        }
    );
});

app.post('/voter-details', authJWTToken, (req, res) => {
    const { voterPublicKey } = req.body;

    // Make database connection and check whether this email, passport and pubkey exists.
    let is_voter_exists_query = `SELECT * FROM voter WHERE pubkey = '${voterPublicKey}'`;
    client.query(is_voter_exists_query, (err, result) => {
        if (err) {
            console.log(`Error => ${err.message}`);
            res.status(404).json(
                {
                    message: 'Voter data not found'
                }
            );
        } else {
            const data = result.rows.map(row => ({
                voterPublicKey: String(row.pubkey),
                has_voted: row.has_voted
            }));

            res.status(200).json(
                {
                    voterPublicKey: data[0].voterPublicKey,
                    has_voted: data[0].has_voted,
                }
            );
        }
    });

});

app.post('/voted', authJWTToken, (req, res) => {
    const { voterPublicKey } = req.body;

    // Make database connection and check whether this email, passport and pubkey exists.
    let update_voter_voted = `UPDATE voter
                            SET has_voted = true
                            WHERE pubkey = '${voterPublicKey}'`;

    client.query(update_voter_voted, (err, result) => {
        if (err) {
            res.status(404).json(
                {
                    message: 'Voter data not found'
                }
            );
        } else {
            res.status(200).json(
                {
                    message: 'Voter has voted'
                }
            );
        }
    });
});

app.get('/vote', authJWTToken, (req, res) => {
    res.status(200).json(
        {
            message: 'On Voting Page'
        }
    );
});

app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.status(200).json(
        {
            message: 'User Logged out.'
        }
    );
});

const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Voter Service(Backend) is active on port ${PORT} `);
});