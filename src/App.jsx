import React from 'react';
import './App.css';
import OrderForm from './OrderForm';
import Home from './home/Home';

class App extends React.Component {

  constructor() {
    super();
    this.state = {};

    this.selectOrder = this.selectOrder.bind(this);
  }

  selectOrder(order) {
    this.setState(state => Object.assign(state, {
      selectedOrder: order,
    }));
  }

  homeOrSelectedOrder() {
    if (this.state.selectedOrder) {
      return (<OrderForm />);
    }
    return (<Home onSelectOrder={this.selectOrder} />);
  }

  render() {
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
        {this.homeOrSelectedOrder()}

      </div>
    );
  }
}


export default App;
