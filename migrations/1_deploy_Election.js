//Reference: https://trufflesuite.com/docs/

const MyContract = artifacts.require("Election");

module.exports = function (deployer) {
    deployer.deploy(MyContract);
};