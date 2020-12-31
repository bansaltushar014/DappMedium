import React, { useState, useEffect, useRef } from 'react';
import web3 from './helper.js';
import axios from "axios";
import Write from './write.js';
import Dashboard from './dashboard.js';
import { Navbar, Button } from 'react-bootstrap';

function App() {

  const [write, setwrite] = useState(1);
  const [instance, setinstance] = useState('');

  var contractInstance = useRef(0);

  useEffect(() => {

    try {
      // if (!web3.eth.net.isListening()) {
      //   console.log("Not connected");
      // } else {
      //   console.log("connected");
      //   web3.eth.net.getId((err, netId) => {
      //   console.log(netId);
      //   switch (netId) {
      //   case 1:
      //         // alert('This is mainnet')
      //         break
      //   case 2:
      //         // alert('This is the deprecated Morden test network.')
      //         break
      //   case 3:
      //         // alert('This is the ropsten test network.')
      //         break
      //   default:
      //         // alert('This is an unknown network.')
      //         }
      //   })
      //
      InitializeContract();
      // }
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

  const callRender = (id) => {
    setwrite(id);
    setinstance(contractInstance);
  }

  return (
    <div>
      <Navbar bg="dark" className="justify-content-end">
        <Navbar.Brand >
          {' '}
          <span style={{ color: "white" }}> DappMedium </span>
          {write == 1 &&
            <>
              <Button variant="light" onClick={() => callRender(0)}>Dashboard</Button>
            </>
          }
          {write == 0 &&
            <>
              <Button variant="light" onClick={() => callRender(1)}>Write</Button>
            </>
          }
        </Navbar.Brand>
      </Navbar>

      <br></br>
      <br></br>

      {write == 1 &&
        <>
          <Write />
        </>
      }
      {write == 0 &&
        <>
          <Dashboard contractInstance={instance} />
        </>
      }

    </div>
  );
}

export default App;
