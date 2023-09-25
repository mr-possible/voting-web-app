const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const { sendDataToBlockchain } = require('./contract_service');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

/************************************ API ENDPOINTS ************************************/

// Endpoint to check the voter info in order for him/her to be able to vote in the flutter app.
app.post('/check-voter', async (request, response) => {
    const validVoter = {
        passportNoPattern: /^[A-Z]{2}\d{6}$/, //Example: AB123456
        age: 18,
        voterPublicKey: /^0x[a-fA-F0-9]{40}$/
    };

    const { passportNo, age, voterPublicKey } = request.body;

    if (validVoter.passportNoPattern.test(passportNo)
        && age >= validVoter.age
        && validVoter.voterPublicKey.test(voterPublicKey)) {
        try {
            const result = await sendDataToBlockchain('authoriseVoter', voterPublicKey);
            response.status(200).json({ message: 'Transaction successful', result });
        } catch (error) {
            console.error('Error: ', error);
            response.status(500).json({ message: 'Transaction failed', error: error.message });
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