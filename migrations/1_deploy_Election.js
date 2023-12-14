//Reference: https://trufflesuite.com/docs/truffle/

const MyContract = artifacts.require("Election");

module.exports = function (deployer) {
    deployer.deploy(MyContract);
};