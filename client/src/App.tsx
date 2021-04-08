// import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import MainPage from './Pages/MainPage'

require('react-paper-css');



function App() {

  return (
      <div className="App">
        <Header></Header>
        <MainPage></MainPage>
      </div>
  );
}




export default App;
