// References: 
// https://www.npmjs.com/package/ws
// https://blog.logrocket.com/websocket-tutorial-real-time-node-react/

const WebSocket = require('ws');

const PORT = 8081;
const wss = new WebSocket.Server({ port: PORT });

const clients = new Set();
const map = new Map();

function transmitStatus(map) {
    const message = JSON.stringify(Object.fromEntries(map));
    clients.forEach((client) => {
        client.send(message);
    });
}

function electionNotStarted() {
    map.set('election_not_started', true);
    setTimeout(() => {
        transmitStatus(map);
    });
}

function startTheElection() {
    map.set('election_not_started', false);
    map.set('election_status', 'election_has_started');
    setTimeout(() => {
        transmitStatus(map);
    });
}

function endTheElection() {
    map.set('election_not_started', true);
    map.set('election_status', 'election_has_ended');
    setTimeout(() => {
        transmitStatus(map);
    });
}

let electionInProgress = false;
function sendInitialElectionStatus(client) {
    const statusMessage = {
        type: 'election_status',
        electionInProgress: electionInProgress,
    };
    client.send(JSON.stringify(statusMessage));
}

wss.on('connection', (client) => {
    clients.add(client);
    sendInitialElectionStatus(client);

    client.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            switch (data.action) {
                case 'start_election':
                    startTheElection();
                    electionInProgress = true;
                    break;
                case 'end_election':
                    endTheElection();
                    break;
                default:
                    electionNotStarted();
            }
        } catch (error) {
            console.error('Error: ', error);
        }

        client.on('close', () => {
            clients.delete(client);
        });
    });
});

console.log(`WebSocket server started on port ${PORT}`);