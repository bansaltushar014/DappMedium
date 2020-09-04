import React from 'react';
import contractInstance from './helper.js';

class ContractInitialization extends React.Component {
  constructor(){
    super();
      this.state = {
        instance: ''
      }

      this.fetchData = this.fetchData.bind(this);

  }

  componentDidMount (){
    var instance = this.fetchData();
  }

  fetchData = async () => {
    this.contractInst = await contractInstance;
    return this.contractInst;
  }

  render() {
  return (
    <div></div>
  );
}
}

// var instance  = new ContractInitialization;
console.log(this.contractInst);

export default ContractInitialization;
// export {ContractInitialization , instance.fetchData};
