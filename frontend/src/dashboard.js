import React from 'react';
import axios from "axios";
import { FormControl, Card, FormGroup, ControlLabel, Modal, Spinner, HelpBlock, Checkbox, Radio, Row, Container, Col, Form, Button, ThemeProvider } from 'react-bootstrap';
import web3 from './helper.js';

class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      write: 1,
      show: 0,
      articlesData: [],
      demo: "",
      loading: 0
    }

    this.getNoOfArticles = this.getNoOfArticles.bind(this);
    this.payToRead = this.payToRead.bind(this);
    this.getWriteAddress = this.getWriteAddress.bind(this);
    // this.getArticle = this.getArticle.bind(this);
    global.addresses = [];
  }


  componentWillMount() {
    console.log(this.props.contractInstance);
    this.contractInstance = this.props.contractInstance;
    this.getNoOfArticles()
  }

  // Get the number of articles exist in Blockchain
  getNoOfArticles = async () => {
    console.log("Inside getNoOfArticles;");
    await this.contractInstance.methods.noOfarticles().call()
      .then(r => {
        console.log(r)
        return this.getTheArticle(r);
      })
      .catch(e => { console.log(e) })
  }

  // Get the articles hashes one by one
  getTheArticle = async (num) => {

    console.log("Inside getTheArticle");

    var hashes = [];
    var i;

    for (i = 0; i < num; i++) {
      await this.contractInstance.methods.getArticle(i).call()
        .then(r => {
          console.log(r);
          hashes.push(r);

          if (i == num - 1)
            return this.getDataFromIpfs(hashes, num);
        })
        .catch(e => { console.log(e) });
    }
  }

  // Extract the data from the hash one by one
  getDataFromIpfs = async (hash, num) => {
    var that = this;
    console.log("Inside getDataFromIpfs!");
    var i;
    for (i = 0; i < num; i++) {
      await axios.get('https://ipfs.io/ipfs/' + hash[i])
        .then(r => {
          console.log(r);
          var data = that.state.articlesData.concat(r);
          that.setState({ articlesData: data })
          that.setState({ show: 1 });
        })
        .catch(e => {
          console.log(e);
        })
    }

    if (i == num)
      this.setState({ loading: 1 });

  }

  // Get the Writer's address of article
  getWriteAddress = (index) => {
    console.log("Inside getTheAddress");
    this.contractInstance.methods.getWriterAddress(index).call()
      .then(r => {
        console.log(r)
        return r;
      })
      .catch(e => {
        console.log(e)
        return e;
      });
  }

  // Get the index of particular article and transfer the money to Writer
  // On its success redirect to OpenPDF
  payToRead = async (index) => {
    var that = this;
    await web3.eth.getAccounts(function (error, result) {
      that.contractInstance.methods.getWriterAddress(index).call()
        .then(r => {
          var that1 = that;
          web3.eth.sendTransaction({
            from: result[0],
            to: r, value:
              web3.utils.toWei("0.01", 'ether'),
            gasLimit: 21000,
            gasPrice: 20000000000
          }, function (err, transactionHash) {
            if (!err)
              console.log(transactionHash);
          })
            .then(r => {
              console.log("Transaction Confirmed " + JSON.stringify(r));
              var sendHash = window.open("./openPdf");
              sendHash.hashIs = that1.state.articlesData[index];
            })
        })
    });
  }

  render() {

    const { write, show, articlesData, demo, loading } = this.state;

    return (
      <>
        {loading == 0 &&
          <>
            &nbsp;&nbsp;
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </>
        }
        {loading == 1 &&
          <>

            <Container >



              {
                articlesData.map((item, index) => {
                  return <div key={index}>
                    <Row className="border border-dark" style={{ padding: "20px" }}>
                      <br></br>
                      <Card style={{ width: '98%' }}>
                        <Card.Body>
                          <Card.Title>
                            {item.data.title}
                          </Card.Title>
                          <Card.Text>
                            <textarea style={{ overflow: 'hidden', width: '90%' }} name="description" rows="2" defaultValue={item.data.text} />
                          </Card.Text>
                          <Button onClick={() => this.payToRead(index)} variant="primary">Read for 0.01 Eth</Button>
                        </Card.Body>
                      </Card>
                    </Row>
                  </div>
                })
              }

            </Container>
            <br></br>
            <br></br>

          </>
        }
      </>
    );
  }
}

export default Dashboard;
