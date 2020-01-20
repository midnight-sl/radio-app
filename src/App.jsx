import React, {Component} from 'react';
import Header from './components/Header';
import StationsList from './components/StationsList';
import Footer from './components/Footer';


import "./styles/App.css";

class App extends Component {
  render(){
    return(
      <div className="App">
        <Header />
        <StationsList />
        <Footer />
      </div>
    );
  }
}

export default App;
