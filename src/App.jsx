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


function todaysDateIso() {
  return (new Date()).toISOString().substring(0, 10);
}


class App extends React.Component {

  constructor() {
    super();

    this.store = localStore;
    this.state = {
      orders: [],
    };


    this.selectOrder = this.selectOrder.bind(this);
    this.deselectOrder = this.deselectOrder.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.changeHeaderField = this.changeHeaderField.bind(this);
    this.addItemToOrder = this.addItemToOrder.bind(this);
    this.changeQuantityOfItemInOrder = this.changeQuantityOfItemInOrder.bind(this);
    this.todaysOrders = this.todaysOrders.bind(this);
    this.visibleOrders = this.visibleOrders.bind(this);
  }


  componentWillMount() {
    this.store.loadData().then((data) => {
      console.log('Loading stored data', data);
      this.setState(data);
    });
  }

  componentDidUpdate() {
    this.store.saveData(this.state);
  }

  selectOrder(order) {
    console.log('selecting order', order);
    this.setState(state => Object.assign(state, {
      selectedOrderId: order.id,
    }));
  }

  createOrder() {
    this.store.createOrder().then((order) => {
      console.log('created order', order);
      this.setState(state => Object.assign(state, {
        orders: this.state.orders.concat([order]),
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

  navigate() {
    if (this.state.selectedOrderId) {
      return (
        <OrderForm
          order={this.state.orders.find(order => order.id === this.state.selectedOrderId)}
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
        orders={this.visibleOrders()}
      />);
  }

  visibleOrders() {
    return this.state.orders.filter(order => order.header.date === todaysDateIso());
  }

  todaysOrders() {
    this.deselectOrder();
    this.setState(state => Object.assign(state, {
      navigationFilter: 'today',
    }));
  }

  render() {
    return (
      <div className="App">
        <nav id="main-nav">
          <a href="#" onClick={this.allOrders}>All Orders</a> |
          <a href="#today" onClick={this.todaysOrders}>Today&apos;s orders</a> |
          Tomorrow&apos;s orders |
          Unpaid orders |
          Edit menu items |
          Monthly summary |
          Log out
        </nav>
        {this.navigate()}
      </div>
    );
  }
}


export default App;
