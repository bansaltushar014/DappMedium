import React, { useState, useEffect, useRef } from 'react';
import { FormControl, FormGroup, ControlLabel, Modal, Spinner, HelpBlock, Checkbox, Radio, Row, Container, Col, Form, Button, ThemeProvider } from 'react-bootstrap';

function OpenPdf() {

  const [articleData, setarticleData] = useState('');

  var contractInstance = useRef(0);

  useEffect(() => {
    if (window.hashIs)
      setarticleData(window.hashIs.data);
  }, [])

  return (
    <>
      <Row>
        <Col sm={1}></Col>
        <Col sm={10}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h3 classnName="text-center" > Title is: {articleData.title} </h3>
          <br></br>
          <br></br>
          <br></br>
          <p style={{ flexShrink: 1, 'whiteSpace': 'unset' }}>
            {articleData.text}
          </p>
          <br></br>
          <br></br>
          <h4 classnName="text-center"> Submitted By: {articleData.submittedBy} </h4>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </>
  )
}

export default OpenPdf;
