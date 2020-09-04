import React from 'react';
import axios from "axios";

// function Dashboard(props){
  class Dashboard extends React.Component {

    constructor(){
      super();
      this.state = {
        write: 1,
        show: 0,
        articlesData: [],
        demo: ""
      }

    this.getNoOfArticles = this.getNoOfArticles.bind(this);
    // this.getArticle = this.getArticle.bind(this);
    global.addresses = [];
    }


  componentWillMount(){
    // debugger;
    console.log(this.props.contractInstance);
    this.contractInstance = this.props.contractInstance;
    this.getNoOfArticles()
  }

  getNoOfArticles = async () => {
    console.log("Inside getNoOfArticles;");
    await this.contractInstance.methods.noOfarticles().call()
    .then(r => {
      console.log(r)
      return this.getTheArticle(r);
      })
    .catch(e => {console.log(e)})
  }

  getTheArticle = async (num) => {

    console.log("Inside getTheArticle");

    var hashes = [];
    var i;

    for(i = 0; i<num; i++) {
      await this.contractInstance.methods.getArticle(i).call()
      .then(r => {
        console.log(r);
        hashes.push(r);

        if(i == num-1)
        return this.getDataFromIpfs(hashes, num);
      })
      .catch(e => {console.log(e)});
    }
  }

  getDataFromIpfs = async (hash, num) => {
    var that = this;
    console.log("Inside getDataFromIpfs!");
    var i;
    for(i = 0; i<num; i++) {
      await axios.get('https://ipfs.io/ipfs/'+hash[i])
      .then(r => {
        console.log(r);
        // this.state.articlesData.push(r);
        var data = that.state.articlesData.concat(r);
        that.setState({ articlesData: data })
        that.setState({show : 1});
      })
      .catch(e => {
        console.log(e);
      })
    }
  }

  getTheAddress = () => {
    console.log("Inside getTheAddress");
    this.contractInstance.methods.getWriterAddress(0).call()
    .then(r => {console.log(r)})
    .catch(e => {console.log(e)});
  }

// pending q is how to return the value , as inside "then" i am returning a value but not getting accepted
// but for the function return accepting, why
// getNoOfArticles = async () => {
//   console.log("Inside getNoOfArticles;");
//   await this.contractInstance.methods.noOfarticles().call()
//   .then(r => {
//     console.log(r)
//     return r;
//   })
//   .catch(e => {console.log(e)})
//
//   return "4";
// }


// it is ok to call setState in componentDidmount but it will render twice, which is lit less effective.
//   render() {
//     return (
//       <div>
//         Dashboard
//         <p> data is {this.state.show} {this.state.articlesData[0]}</p>
//       // {
//       //   this.state.articlesData.map((item) => {
//       //     return <li> {item.data} </li>
//       //   })
//       // }
//       </div>
//
//     );
//     }
// }

  callFun = (index) => {
    console.log("Index is " + index);
  }

render() {
  // There are many ways to render the data, {} or () have a impant on the rendering.
  // Declaring the const before the return is necessary when this.state is not working there
  const {write, show, articlesData, demo} = this.state;
  return (
  <>
  {
    articlesData.map((item, index) => {
      // return is required to show data
      return <div key={index}>
      <br></br>
      <button  onClick={()=>{this.callFun(index)}}>{item.data.title}</button>
      </div>
      })
  }

  </>

  );
}
}

export default Dashboard;
