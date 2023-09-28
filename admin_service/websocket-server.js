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
    map.set('electionInProgress', false);
    setTimeout(() => {
        transmitStatus(map);
    });
}

function startTheElection() {
    map.set('electionInProgress', true);
    setTimeout(() => {
        transmitStatus(map);
    });
}

function endTheElection() {
    map.set('electionInProgress', false);
    setTimeout(() => {
        transmitStatus(map);
    });
}

function sendInitialElectionStatus(client) {
    // Whenever client connects, he will get the value of electionInProgress at that time.
    if (map.size === 0) {
        map.set('electionInProgress', false);
    } else {
        map.set('electionInProgress', map.get('electionInProgress'));
    }

    client.send(JSON.stringify(Object.fromEntries(map)));
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