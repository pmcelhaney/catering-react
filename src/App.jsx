import React from 'react';
import update from 'immutability-helper';

import './App.css';
import OrderForm from './OrderForm';
import Home from './home/Home';
import localStore from './store/LocalStore';


function setQuantityOfLineItemById(quantity, lineItems, id) {
  return lineItems.map((lineItem) => {
    if (lineItem.item.id === id) {
      return Object.assign({}, lineItem, { quantity });
    }
    return lineItem;
  });
}

function addLineItem(lineItems, item) {
  const existingLineItem = lineItems.find(li => li.item.id === item.id);
  if (existingLineItem) {
    return setQuantityOfLineItemById(existingLineItem.quantity + 1, lineItems, item.id);
  }
  return lineItems.concat([{ quantity: 1, item }]);
}


class App extends React.Component {

  constructor() {
    super();

    this.store = localStore;
    this.state = {
      orders: {},
    };


    this.selectOrder = this.selectOrder.bind(this);
    this.deselectOrder = this.deselectOrder.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.changeHeaderField = this.changeHeaderField.bind(this);
    this.addItemToOrder = this.addItemToOrder.bind(this);
    this.changeQuantityOfItemInOrder = this.changeQuantityOfItemInOrder.bind(this);
  }


  componentWillMount() {
    this.store.loadData().then((data) => {
      this.setState(data);
    });
  }

  componentDidUpdate() {
    this.store.saveData(this.state);
  }

  selectOrder(order) {
    this.setState(state => Object.assign(state, {
      selectedOrderId: order.id,
    }));
  }

  createOrder() {
    this.store.createOrder().then((order) => {
      this.setState(state => Object.assign(state, {
        orders: Object.assign(this.state.orders, { [order.id]: order }),
      }));
      this.selectOrder(order);
    });
  }

  changeHeaderField(order, name, value) {
    this.setState(state =>
      update(state, {
        orders: {
          [order.id]: {
            header: {
              [name]: {
                $set: value,
              },
            },
          },
        },
      }),
    );
  }

  addItemToOrder(item, order) {
    this.setState(state =>
      update(state, {
        orders: {
          [order.id]: {
            lineItems: {
              $apply: lineItems => addLineItem(lineItems, item),
            },
          },
        } }),
    );
  }


  changeQuantityOfItemInOrder(quantity, item, order) {
    this.setState(state =>
      update(state, {
        orders: {
          [order.id]: {
            lineItems: {
              $apply: lineItems => setQuantityOfLineItemById(quantity, lineItems, item.id),
            },
          } },
      }),
    );
  }

  deselectOrder() {
    this.setState(state => Object.assign(state, {
      selectedOrderId: null,
    }));
  }

  homeOrSelectedOrder() {
    if (this.state.selectedOrderId) {
      return (
        <OrderForm
          order={this.state.orders[this.state.selectedOrderId]}
          onChangeHeaderField={this.changeHeaderField}
          addItemToOrder={this.addItemToOrder}
          changeQuantityOfItemInOrder={this.changeQuantityOfItemInOrder}
          onClose={this.deselectOrder}
        />);
    }
    return (
      <Home
        onCreateOrder={this.createOrder}
        onSelectOrder={this.selectOrder}
        orders={this.state.orders}
      />);
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
