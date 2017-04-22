import React from 'react';
// import './App.css';

class OrderList extends React.Component {

  constructor() {
    super();
    this.orders = [
      { id: 1 },
      { id: 3 },
      { id: 5 },
    ];
  }

  orderListItems() {
    return this.orders.map(order => (
      <li>{order.id}</li>
    ));
  }

  render() {
    return (
      <div className="order-list">
        <h2>Order list</h2>
        <button type="button">Create a new order</button>
        <ol>{this.orderListItems()}</ol>
      </div>
    );
  }
}

export default OrderList;
