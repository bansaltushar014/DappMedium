import React, { useState, useEffect, useRef } from 'react';
import web3 from './helper.js';
import axios from "axios";
import MyEditor from './myEditor.js';
import Dashboard from './dashboard.js';


function App() {

  const [write, setwrite] = useState(1);
  const [instance, setinstance] = useState('');
  const [noOfArticles, setnoOfArticles] = useState('');
  const [articlesData, setarticlesData] = useState([]);
  const [addresses, setaddresses] = useState([]);

  var contractInstance = useRef(0);
  var addresses1 = useRef([]);

  useEffect( () => {

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
    // axios.get('http://localhost:4000/static/DappMedium.json')
    axios.get('http://localhost:4000/static/DappMedium.json')
    .then(function (response) {
      const Abi = response.data.abi;
      const ContractAddress = response.data.networks[5777].address;
      contractInstance = new web3.eth.Contract(Abi, ContractAddress);
      // return getNoOfArticles()
    })
    // .then(r=> {console.log(r)})
    .catch(function (error) {
      console.log(error);
    });
  }

  const getNoOfArticles = async () => {
    debugger;
    console.log("Inside GetNumOfArticles");
    await contractInstance.methods.noOfarticles().call()
    .then(r => {
      setnoOfArticles(r);
      return getArticles(r);
    })
  }

  const getArticles = async (num) => {
    console.log("Inside getArticles!");
    var i;
    for(i=0; i< num; i++ ){
     await contractInstance.methods.getArticle(i).call()
      .then( r=> {
        // setaddresses(addresses.concat(r));
        // addresses1[i] = r;
        console.log(r);
        if(i == num){
          return getDatafromIPFS(num, r);
        }
      })
      .catch( e=> {
        console.log(e);
      })
  }
}

  const getDatafromIPFS = async (num, hashString) => {
    console.log("Inside getDatafromIPFS!");
    var i = 0;
    for(i=0; i< num; i++ ){
      var hash = hashString;
      await axios.get('https://ipfs.io/ipfs/'+hash)
      .then(function (response) {
        setarticlesData.push(response);

        if(i == num){
          for(var i =0;i< num; i++){
            console.log(articlesData[i]);
          }
        }
        // resolve();
        // that.renderarticleData().then(r=> {resolve()});

      })
      .catch(function (error) {
        console.log(error);

      });

    }
  }

  const callRender = (id) => {

    setwrite(id);
    setinstance(contractInstance);
  }

  return (
    <div>
    <button onClick={getNoOfArticles}>wDashboard</button>

  { write == 1 &&
    <>
    <button onClick={() => callRender(0)}>Dashboard</button>
    <MyEditor />

    </>
  }
  { write == 0 &&
    <>

    <button onClick={() => callRender(1)}>Write</button>

    <Dashboard contractInstance={instance}/>

    </>
  }

    </div>
  );
}

export default App;
