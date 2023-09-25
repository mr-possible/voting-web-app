// References: 
// https://github.com/jklepatch/eattheblocks/blob/master/screencast/200-send-transaction-with-web3-nodejs/script.js
// https://docs.web3js.org/guides/web3_providers_guide/examples
// https://docs.web3js.org/guides/smart_contracts/deploying_and_interacting_with_smart_contracts
// https://www.npmjs.com/package/dotenv-expand

var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')
const { Web3 } = require('web3');

var myEnv = dotenv.config({path: './.env'});
dotenvExpand.expand(myEnv)

const MyContract = require(process.env['ADMIN_TRUFFLE_ARTIFACTS_PATH']);
const privateKey = process.env['ADMIN_PRIVATE_KEY'];
const ganacheURL = process.env['GANACHE_URL'];

const httpProvider = new Web3.providers.HttpProvider(ganacheURL);
const web3 = new Web3(httpProvider);
const ADMIN_ADDRESS = web3.eth.accounts.wallet.add(privateKey)[0].address;

const sendDataToBlockchain = async (functionName, ...functionParams) => {
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
    );

    const tx = myContract.methods[functionName](...functionParams);
    const gas = await tx.estimateGas({ from: ADMIN_ADDRESS });
    const data = tx.encodeABI();

    const txData = {
        from: ADMIN_ADDRESS,
        to: myContract.options.address,
        data,
        gas,
        chainId: 1337
    };

    const receipt = await web3.eth.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
}

module.exports = {
    sendDataToBlockchain
};