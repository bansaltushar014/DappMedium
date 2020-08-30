import React, { useState, useEffect, useRef } from 'react';
import web3 from './helper.js';
import axios from "axios";
import MyEditor from './myEditor.js';


function App() {

  var contractInstance = useRef(0);

  useEffect(() => {
    try {
      if (!web3.eth.net.isListening()) {
        console.log("Not connected");
      } else {
        console.log("connected");
        web3.eth.net.getId((err, netId) => {
        console.log(netId);
        switch (netId) {
        case 1:
              // alert('This is mainnet')
              break
        case 2:
              // alert('This is the deprecated Morden test network.')
              break
        case 3:
              // alert('This is the ropsten test network.')
              break
        default:
              // alert('This is an unknown network.')
              }
        })
        InitializeContract();
      }
    } catch (e) {
      console.log("Exception is " + JSON.stringify(e));
    }
  });

  // Initialize te contract
  const InitializeContract = () => {
    axios.get('http://localhost:4000/static/DappMedium.json')
    .then(function (response) {
      const Abi = response.data.abi;
      const ContractAddress = response.data.networks[5777].address;
      contractInstance = new web3.eth.Contract(Abi, ContractAddress);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
    working here

    <MyEditor />
    </div>
  );
}

export default App;


// "0xaEEc5253ea0db322e1382848D2FCbc2Fc803Ab79", U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy+bu0=
// "0xaEEc5253ea0db322e1382848D2FCbc2Fc803Ab79", 1000000000000000000
