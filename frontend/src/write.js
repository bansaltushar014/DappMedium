import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import { FormControl, FormGroup, ControlLabel, Modal, Spinner, HelpBlock, Checkbox, Radio, Row, Container, Col, Form, Button, ThemeProvider } from 'react-bootstrap';
import axios from "axios";
import web3 from './helper.js';

class MyEditor extends React.Component {

  constructor(){
    super();
    this.state = {
      titleofArticle: '',
      textofArticle: '',
      SubmittedofArticle: '',
      PaidAddress: '',
      limit: '',
      file: ''
    }
    this.postData = this.postData.bind(this);
    this.saveToContract = this.saveToContract.bind(this);
    this.InitializeContract = this.InitializeContract.bind(this);
  }

  componentDidMount(){
    this.InitializeContract();
  }

  InitializeContract = () => {
    var that = this;
    axios.get('http://localhost:4000/static/DappMedium.json')
    .then(function (response) {
      const Abi = response.data.abi;
      const ContractAddress = response.data.networks[5777].address;
      that.contractInstance = new web3.eth.Contract(Abi, ContractAddress);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deposit =  (e) => {
    e.preventDefault()
    this.data = {
      title: this.state.titleofArticle,
      text: this.state.textofArticle,
      submittedBy: this.state.SubmittedofArticle
    }
    this.postData();
  }

  postData = () => {
    console.log(this.data);
    axios({
      method: 'post',
      url: 'http://localhost:4000/postData',
      data: this.data
    })
    .then(r=> {
      console.log(r.data.data);
      this.saveToContract(r.data.data);
    })
    .catch(e => {
      console.log(e);
    })
  }

  saveToContract = (hash) => {
    web3.eth.getAccounts()
    .then(account => {
    this.contractInstance.methods.addArticle(this.state.PaidAddress, hash)
    .send({from: account[0]})
    .then(r => {
      console.log(r);
    })
    .catch(e => {
      console.log(e);
    })
  })
  }


  titleArticle =  (e) => {
    this.setState({titleofArticle: e.target.value})
  }

  textArticle =  (e) => {

    if(e.target.value.length >= 2000){
      alert("Not Allowed to enter text greater than 2000 characters!")
      e.target.value = e.target.value.substring(0, 1999);
    }
    this.setState({textofArticle: e.target.value.replace(/[^a-zA-Z ]/g, "")})
    this.setState({limit: e.target.value.length})
  }

  SubmittedByArticle = (e) => {
    this.setState({SubmittedofArticle: e.target.value})
  }

  PaidAddress = (e) => {
    this.setState({PaidAddress: e.target.value})
  }

  render() {
    return (

      <div>
      <Row>
      <Col sm={1}></Col>
      <Col sm={10}>
      <Form onSubmit={this.deposit}>
      <Form.Group  controlId="formBasicEmail">
      <Form.Label>Heading of Article</Form.Label>
      <br></br>
      <Form.Control autoComplete="new-password" onChange={this.titleArticle} type="text" placeholder="Heading of Article" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>Start From here!</Form.Label>
      <Form.Control onChange={this.textArticle} as="textarea" rows="15" />
      <Form.Text className="text-muted">
        words: {this.state.limit}/2000
      </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicEmail1">
      <Form.Label>Submitted By:</Form.Label>
      <br></br>
      <Form.Control onChange={this.SubmittedByArticle} type="text" placeholder="SubmittedBy" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail2">
      <Form.Label>Address Paid To:</Form.Label>
      <br></br>
      <Form.Control onChange={this.PaidAddress} type="text" placeholder="PaidAddress" />
      </Form.Group>
      <Button variant="primary" type="submit">
      Submit
      </Button>
      </Form>
      </Col>
      <Col sm={1}></Col>
      </Row>
      </div>
    );
  }
}

export default MyEditor;
