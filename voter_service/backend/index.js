const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Client } = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pgp = require('pg-promise')();

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

app.use(
    session({
        store: new pgSession({
            pool: pgp('postgres://sambhavdave:sambhav@localhost:5432/voting_webapp'),
            tableName: 'voter_session',
        }),
        secret: 'csm20',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000,
        },
    })
);

function isVoterAuthenticated(request, response, next) {
    if (request.session.user) {
        // Proceed
        next();
    } else {
        // Redirect to voter login page
        response.redirect("/");
    }
}

/************************************ API ENDPOINTS ************************************/

// Endpoint to check the voter info in order for him/her to be able to vote in the flutter app.
app.post('/login', async (request, response) => {
    const adminEndpoint = 'http://127.0.0.1:8080/check-voter';

    try {
        const res = await axios.post(adminEndpoint, request.body);
        if (res.status === 200) {
            response.status(200).json({ message: 'Request successful!' });
        } else {
            response.status(500).json({ message: 'Please contact Election administrator!' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/logout', async (request, response) => {
    request.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.sendStatus(500);
        } else {
            res.redirect("/");
        }
    });

});

const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Voter Service (Backend) is active on port ${PORT}`);
});