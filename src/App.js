import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/login';
import Home from './pages/home';
import SpotifyPage from './pages/spotifyPage';
import React, { useState, useEffect } from 'react';
import Register from './pages/register';
import ViewUser from './pages/viewUser';


function App() {


  return (
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={SpotifyPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/viewUser/:username" component={ViewUser} />
        </Switch>
      </Router>
  );
}
  
  export default App;