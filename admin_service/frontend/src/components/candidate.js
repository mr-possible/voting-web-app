import React, { useState } from 'react';
import { BACKEND_HOST } from '../utils/constants';

function AddCandidate() {
  const [showDialog, setShowDialog] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleCandidateNameChange = (e) => {
    setCandidateName(e.target.value);
  };

  const handleSubmit = async () => {
    //1. Candidate name should not be empty.
    const candidateNameField = document.getElementById('candidateNameField');
    if (candidateNameField.value === '') {
      alert('Please insert a valid candidate name !!');
    } else {
      try {
        //2. Hit Backend API to add candidate.
        setIsLoading(true);
        const response = await fetch(`${BACKEND_HOST}/add-candidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ candidateName }),
        });

        if (response.ok) {
          console.log('Candidate added to our blockchain');
        } else {
          console.error('Failure in adding the candidate!');
        }
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setIsLoading(false);
        closeDialog();
      }
    }
  };

  return (
    <section>
      <button className="button is-link is-light" onClick={openDialog}><b>Add Candidate</b></button>
      {showDialog && (
        <div className="container">
          <br />
          <h2 className="title is-3">Add Election Candidate</h2>
          <div className='columns'>
            <div className='column'>
              <input
                id="candidateNameField"
                className="input"
                placeholder="Enter his/her name"
                type="text"
                onChange={handleCandidateNameChange}
                value={candidateName}
              />
            </div>
            <div className='column is-2'>
              <button className="button is-link is-light" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? '...' : 'Submit'}
              </button>
              &nbsp;&nbsp;
              <button className="button is-link is-light" onClick={closeDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AddCandidate;