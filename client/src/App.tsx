// import logo from './logo.svg';
import './App.css';
import React from 'react'
import Header from './Components/Header'
import Login from './Pages/Login'
import Room from './Pages/Room'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

require('react-paper-css');



function App() {

  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Switch>
          <Route path="/room" component={Room}></Route>
          <Route path="/" component={Login}></Route>
        </Switch>
      </div>
    </Router>
  );
}




export default App;
