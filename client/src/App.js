import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
import { Switch, Route, } from 'react-router-dom';
import { Container, } from "semantic-ui-react";
import Available from './components/Available'
import Cities from './components/Cities'
// import Cities from './components/Citiez'
import FindHome from './components/FindHome'
import CityCost from './components/CityCost'

const App = () => (
  <>
    <Navbar />
    <FetchUser>
      <Container>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/available" component={Available} />
          <Route exact path="/findHomes" component={FindHome} />
          <Route exact path="/cities" component={Cities} />
          <Route exact path="/cost" component={CityCost} />
          <Route exact path="/register" component={Register} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </>
);

export default App;