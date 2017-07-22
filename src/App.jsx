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

function tomorrowsDateIso() {
  const today = new Date();
  return new Date(today.setDate(today.getDate() + 1)).toISOString().substring(0, 10);
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
    this.removeItemFromOrder = this.removeItemFromOrder.bind(this);
    this.changeQuantityOfItemInOrder = this.changeQuantityOfItemInOrder.bind(this);
    this.setNavigationFilter = this.setNavigationFilter.bind(this);
    this.allOrders = this.allOrders.bind(this);
    this.visibleOrders = this.visibleOrders.bind(this);
    this.activeClass = this.activeClass.bind(this);
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
        orders: this.state.orders.concat([order]),
      }));
      this.selectOrder(order);
    });
  }

  changeHeaderField(order, name, value) {
    this.setState(state =>
      update(state, {
        orders: {
          $set: state.orders.map((o) => {
            if (o.id === order.id) {
              return update(o,
                {
                  header: {
                    [name]: {
                      $set: value,
                    },
                  },
                },
              );
            }
            return o;
          }),
        },
      }),
    );
  }

  addItemToOrder(item, order) {
    this.setState(state =>
      update(state, {
        orders: {
          $set: state.orders.map((o) => {
            if (o.id === order.id) {
              return update(o,
                {
                  lineItems: {
                    $apply: lineItems => addLineItem(lineItems, item),
                  },
                },
              );
            }
            return o;
          }),
        },
      }),
    );
  }

  changeQuantityOfItemInOrder(quantity, item, order) {
    this.setState(state => update(state, {
      orders: {
        $set: state.orders.map((o) => {
          if (o.id === order.id) {
            return update(o,
              {
                lineItems: {
                  $set: setQuantityOfLineItemById(quantity, o.lineItems, item.id),
                },
              },
            );
          }
          return o;
        }),
      },
    }));
  }

  removeItemFromOrder(item, order) {
    console.log('remove');
    this.setState(state => update(state, {
      orders: {
        $set: state.orders.map((o) => {
          if (o.id === order.id) {
            const newOrder = update(o,
              {
                lineItems: {
                  $set: o.lineItems.filter(lineItem => lineItem.item.id !== item.id),
                },
              },
            );
            return newOrder;
          }
          return o;
        }),
      },
    }));
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
          removeItemFromOrder={this.removeItemFromOrder}
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
    const filters = {
      all() { return true; },
      today(order) { return order.header.date === todaysDateIso(); },
      tomorrow(order) { return order.header.date === tomorrowsDateIso(); },
    };
    const selectedFilter = filters[this.state.navigationFilter || 'all'];
    return this.state.orders.filter(selectedFilter);
  }

  setNavigationFilter(filterName) {
    this.deselectOrder();
    this.setState(state => Object.assign(state, {
      navigationFilter: filterName,
    }));
  }


  allOrders() {
    this.deselectOrder();
    this.setState(state => Object.assign(state, {
      navigationFilter: null,
    }));
  }

  activeClass(filter) {
    if (this.state.navigationFilter === filter) {
      return 'active';
    }
    return '';
  }

  render() {
    return (
      <div className="App">
        <nav id="main-nav">
          <a href="#all" className={this.activeClass(null)} onClick={this.allOrders}>All Orders</a> |
          <a href="#today" className={this.activeClass('today')} onClick={() => this.setNavigationFilter('today')}>Today&apos;s orders</a> |
          <a href="#tomorrow" className={this.activeClass('tomorrow')} onClick={() => this.setNavigationFilter('tomorrow')}>Tomorrow&apos;s orders</a> |
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
