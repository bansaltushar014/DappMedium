import Web3 from 'web3';
const dotenv = require('dotenv');

const env = dotenv.config();

const Initialize = {
  web3: null,
  initial: function () {
    if (typeof web3 !== 'undefined' && window.ethereum) {
      console.log("connected metamask!");
      console.log(process.env.Ropsten_URL);
      this.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else {
      console.log("Connect via infura");
      this.web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
      // this.web3 = new Web3(new Web3.providers.HttpProvider(process.env.Ropsten_URL));
    }
  }
}

Initialize.initial();

export default Initialize.web3;
