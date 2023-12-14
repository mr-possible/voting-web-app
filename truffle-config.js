// References: https://trufflesuite.com/docs/truffle/

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,     
      network_id: "*",
    }
  },
  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },
  
  contracts_build_directory: "./truffle-artifacts",
  
  compilers: {
    solc: {
      version: "0.8.18"
    },
  }
}