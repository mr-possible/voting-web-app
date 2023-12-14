/*
References for this file:   
    Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
    web3js: https://web3js.readthedocs.io/en/v1.10.0/    
*/

import CompiledSmartContract from 'truffle-artifacts';
import Web3 from 'web3';

let myContract, selectedAccount, web3, networkId;
let isSetupDone = false;

export const establishConnectionWithWeb3 = async () => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
        provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                selectedAccount = accounts[0];
                console.log(`Account in operation by metamask is ${selectedAccount}`);
            })
            .catch((error) => {
                console.error(error);
                return;
            });

        window.ethereum.on('accountsChanged', function (accounts) {
            selectedAccount = accounts[0];
        });
    } else {
        alert("Please install metamask extension!")
    }

    web3 = new Web3(provider);
    networkId = await web3.eth.net.getId();

    myContract = new web3.eth.Contract(
        CompiledSmartContract.abi,
        CompiledSmartContract.networks[networkId].address
    );

    isSetupDone = true;
    console.log("Web3 Client connected!")
};

export const getDataFromBlockchain = async (functionName, functionParams) => {
    if (!isSetupDone) {
        await establishConnectionWithWeb3();
    }

    const val = await myContract.methods[functionName](...functionParams)
        .call()
        .catch((error) => {
            console.error('Error calling smart contract method:', error);
            throw error;
        });
    return val;
};

export const sendDataToBlockchain = async (functionName, functionParams) => {
    if (!isSetupDone) {
        await establishConnectionWithWeb3();
    }
    const tx = myContract.methods[functionName](...functionParams);
    const gas = await tx.estimateGas({ from: selectedAccount });
    const data = tx.encodeABI();

    const txData = {
        from: selectedAccount,
        to: myContract.options.address,
        data,
        gas,
        chainId: 1337
    };

    const receipt = await web3.eth.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    return receipt;
};