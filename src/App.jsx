import React from 'react';
import './App.css';
import OrderForm from './OrderForm';
import Home from './home/Home';

function App() {
  return (
    <div className="App">
      <nav id="main-nav">
        Todays orders |
        Tomorrows orders |
        Unpaid orders |
        Edit menu items |
        Monthly summary |
        Log out
      </nav>
      <Home />
    </div>
  );
}


export default App;
