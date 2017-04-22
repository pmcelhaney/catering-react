import React, { Component } from 'react';
// import './App.css';

class OrderList extends Component {
  orders() {
    const orders = [
      {id: 1},
      {id: 3},
      {id: 5},
    ];
    return orders.map(order => (
        <li>{order.id}</li>
    ));
  }
  render() {
    return (
      <div className="order-list">
        <h2>Order list</h2>
        <button type="button">Create a new order</button>
        <ol>{this.orders()}</ol>
      </div>
    );
  }
}

export default OrderList;
