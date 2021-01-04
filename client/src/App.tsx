// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './Components/Login';
import Header from './Components/Header'
import MainMenu from './Components/MainMenu'
require('react-paper-css');



function App() {

  return (
    <div className="App">
      <Header></Header>
      <MainMenu></MainMenu>
    </div>
  );
}




export default App;
