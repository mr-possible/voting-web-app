const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const secret_key = "csm20-secret-key";
let voter = {};

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
app.post('/login', (request, response) => {
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
    console.log(`Voter Service (Backend) is active on port ${PORT}`);
});