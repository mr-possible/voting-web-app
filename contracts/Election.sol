// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

// Reference & Credits: https://github.com/akmadan/voting_dapp

contract Election {
    struct Candidate {
        string candidateName;
        uint256 voteCount;
    }

    struct Voter {
        string voterName;
        uint256 candidateVotedFor;
        bool isValid;
        bool hasAlreadyVoted;
    }

    address public electionComm;
    string public electionName;
    mapping(address => Voter) public allVoters;
    Candidate[] public allCandidates;

    modifier electionCommStaffOnly() {
        require(msg.sender == electionComm);
        _;
    }

    function getElectionName() public view returns (string memory) {
        return electionName;
    }

    function startTheElection(string memory _electionName) public {
        electionComm = msg.sender;
        electionName = _electionName;
    }

    function getCandidateData(
        uint index
    ) public view returns (Candidate memory) {
        return allCandidates[index];
    }

    function addNewCandidate(
        string memory _candidateName
    ) public electionCommStaffOnly {
        allCandidates.push(Candidate(_candidateName, 0));
    }

    function getCountOfCandidates() public view returns (uint256) {
        return allCandidates.length;
    }

    function authoriseVoter(
        address _addressOfVoter
    ) public electionCommStaffOnly {
        // This means that the voter is now eligibile to vote.
        allVoters[_addressOfVoter].isValid = true;
    }

    function vote(uint256 _candidateId) public {
        require(allVoters[msg.sender].hasAlreadyVoted == false);
        require(allVoters[msg.sender].isValid);
        allVoters[msg.sender].candidateVotedFor = _candidateId;
        allVoters[msg.sender].hasAlreadyVoted = true;

        allCandidates[_candidateId].voteCount++;
    }

    function getWinner() public view returns (string memory) {
        uint maxVotes = 0;
        string memory electionWinner = "";
        
        for (uint i = 0; i < allCandidates.length; i++) {
            if (allCandidates[i].voteCount > maxVotes) {
                maxVotes = allCandidates[i].voteCount;
                electionWinner = allCandidates[i].candidateName;
            }
        }
        
        return electionWinner;
    }
}