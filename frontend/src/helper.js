import Web3 from 'web3';
import axios from "axios";

const Initialize = {
  web3 : null,
  // contractInstance: null,
  initial:function () {
    if (typeof web3 !== 'undefined' && window.ethereum) {
      // Use Mist/MetaMask's provider
      console.log("connected metamask!");
      this.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else {
      console.log("Connect via infura");
      // this.web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
      this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cdfba71cda344898bfcfeaee923cf849"));

    }
  }
//   InitializeContract: async function() {
//
// }
}

// Initialize.InitializeContract().
// then(r=>{
//   console.log(r);
// })

// console.log(Initialize.contractInstance);
// export default Initialize.contractInstance;
// export default Initialize.InitializeContract()
//   .then(r=> {
//     return r;
//   })

Initialize.initial();

export default Initialize.web3; 
