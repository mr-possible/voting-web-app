/**
 * Reference:
 * https://www.npmjs.com/package/ws
 * https://bulma.io/documentation/
 *  */
import React, { useState, useEffect } from 'react';
import { BACKEND_HOST, WEBSOCKET_URL } from './utils/constants';
import AddCandidate from './components/candidate';

const socket = new WebSocket(WEBSOCKET_URL);

function App() {
  const [isElectionStarted, setIsElectionStarted] = useState(false);
  const [isElectionEnded, setIsElectionEnded] = useState(false);
  const [electionName, setElectionName] = useState('');

  useEffect(() => {
    const message = {
      action: 'not_yet_election',
      is_socket_connected: socket.OPEN ? 'yes' : 'no'
    };
    if (socket.readyState) {
      socket.send(JSON.stringify(message));
    }
  }, []);

  const handleElectionNameChange = (e) => {
    setElectionName(e.target.value);
  };

  const startElection = async () => {
    //1. ElectionName should not be empty
    const electionFieldValue = document.getElementById('electionNameField');

    if (electionFieldValue.value === '') {
      alert('Please insert a valid election name !!');
    } else {
      //2. BroadCast Status Through WebSocket      
      const message = {
        action: 'start_election'
      };

      socket.send(JSON.stringify(message));

      setIsElectionStarted(true);
      setIsElectionEnded(true);

      //3. Backend Call
      try {
        const response = await fetch(`${BACKEND_HOST}/start-election`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ electionName }),
        });

        if (response.ok) {
          console.log('An election is now started!');
        } else {
          console.error('Failure in starting the election!');
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  };

  const endElection = () => {
    const message = {
      action: 'end_election'
    };

    socket.send(JSON.stringify(message));

    // Clear entered election name value in the text field and reset all states of election start and end
    setElectionName('');
    setIsElectionStarted(false);
    setIsElectionEnded(false);
  };

  return (
    <section className="section">
      <div className="container is-fluid">
        <h1 className="title is-1">Admin Panel (Election Commission)</h1>
      </div>
      <br />
      <div className="container is-fluid">
        <div className='columns is-desktop'>
          <div className='column is-7'>
            <div className='control'>
              <input
                id='electionNameField'
                className="input"
                type='text'
                placeholder='Enter Election Name'
                onChange={handleElectionNameChange}
                value={electionName}
              />
            </div>
          </div>
          <div className="column">
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link is-light">Reset</button>
              </div>
              <div className="control">
                <button className="button is-link is-light" onClick={startElection} disabled={isElectionStarted}>
                  {isElectionStarted ? 'Election Started' : 'Start Election'}
                </button>
              </div>
              <div className='control'>
                <button disabled={!isElectionEnded} className="button is-link is-light" onClick={endElection}>End Election</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className='container' align="center">
        <div className='columns'>
          <div className='column'>
            <AddCandidate />
          </div>
        </div>
      </div>
      <br />
      <div className='container' align="center">
        <div className='columns'>
          <div className='column'>
            <button className="button is-link is-light"><b>Announce Winner</b></button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;