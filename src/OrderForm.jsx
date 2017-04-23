/*
  TODO

  Immutable.js

  state.cart is an OrderedMap
  menu is a List

  if (state.cart.has(id)) {
    state.cart.setIn([id, 'quantity'], start.cart.get(id).get('quantity') + 1)
  } else {
    state.cart.add(id, {quanity: 1, item})
  }

*/


import React from 'react';
import './order-form.css';
import Order from './Order';
import Menu from './Menu';
import Register from './Register';


import CustomerInformation from './CustomerInformation';

function generateMenu() {
  const items = [
    {
      id: 1,
      name: 'BBQ',
      unitPrice: 4,
      categories: [
        'lunch',
        'dinner',
      ],
    },
    {
      id: 2,
      name: 'Baked beans',
      unitPrice: 2.50,
      categories: [
        'breakfast',
        'lunch',
        'dinner',
      ],
    },
    {
      id: 3,
      name: 'Buns',
      unitPrice: 0.50,
      categories: [
        'lunch',
      ],
    },
    {
      id: 4,
      name: 'Eggs',
      unitPrice: 2.75,
      categories: [
        'breakfast',
        'lunch',
      ],
    },
  ];

  for (let i = 5; i < 40; i += 1) {
    items.push({
      id: i,
      name: 'Another Item',
      unitPrice: Math.floor(Math.random() * 50) / 4,
    });
  }
  return items;
}


function incrementQuanityOfLineItemById(lineItems, id) {
  return lineItems.map((lineItem) => {
    if (lineItem.item.id === id) {
      return Object.assign(lineItem, { quantity: lineItem.quantity + 1 });
    }
    return lineItem;
  });
}

function addLineItem(lineItems, item) {
  const existingLineItem = lineItems.find(li => li.item.id === item.id);
  if (existingLineItem) {
    return incrementQuanityOfLineItemById(lineItems, item.id);
  }
  return lineItems.concat([{ quantity: 1, item }]);
}


class OrderForm extends React.Component {

  constructor() {
    super();

    this.addItemToCart = this.addItemToCart.bind(this);

    this.order = new Order({
      id: 1,
      name: 'John Doe',
    });

    const cart = {
      lineItems: [],
    };

    this.state = {
      cart,
    };
  }

  addItemToCart(item) {
    this.setState(state =>
      ({
        cart: {
          lineItems: addLineItem(state.cart.lineItems, item),
        },
      }),
    );
  }

  render() {
    return (
      <div className="order-form">
        <div className="order-header">
          <h2>Order #{this.order.id}</h2>
          <CustomerInformation order={this.order} />
        </div>
        <Menu items={generateMenu()} selectItem={this.addItemToCart} />
        <Register cart={this.state.cart} />
        <div className="order-actions">
          <button type="button">Print Invoice</button>
          <button type="button">Print Catering Slip</button>
          <button type="button">Fulfill Order</button>
          <button type="button">Record Payment</button>
        </div>
      </div>
    );
  }
}

export default OrderForm;
