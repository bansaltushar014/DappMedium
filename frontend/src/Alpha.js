import React from 'react';
import App from './App';
import OpenPdf from './openPdf';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

function Alpha(){
  return(
    <div>
    <Router>
    <div>
    <Switch>
    <Route exact path='/'  component={App} />
    <Route path='/openPdf' component={OpenPdf} />
    <Route component={NoMatch}/>
    </Switch>
    </div>
    </Router>
    </div>
  )
}
function NoMatch(){
  return(
    <div>
    NoMatch
    </div>
  )
}

export default Alpha;
