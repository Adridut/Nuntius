// import logo from './logo.svg';
import './App.css';
import React from 'react'
import Header from './Components/Header'
import MainMenu from './Pages/MainMenu'
import Login from './Pages/Login'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

require('react-paper-css');



function App() {

  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={MainMenu}></Route>
        </Switch>
      </div>
    </Router>
  );
}




export default App;
