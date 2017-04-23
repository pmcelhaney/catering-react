import React from 'react';
import update from 'immutability-helper';


import './order-form.css';
import generateMenu from './generateMenu';
import Menu from './Menu';
import Register from './Register';

import OrderHeader from './OrderHeader';


function setQuanityOfLineItemById(quantity, lineItems, id) {
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
    return setQuanityOfLineItemById(existingLineItem.quantity + 1, lineItems, item.id);
  }
  return lineItems.concat([{ quantity: 1, item }]);
}


class OrderForm extends React.Component {

  constructor() {
    super();

    this.addItemToOrder = this.addItemToOrder.bind(this);
    this.changeQuantityOfItem = this.changeQuantityOfItem.bind(this);

    const order = {
      id: 1,
      header: {
        name: 'John Q. Doe',
      },
      lineItems: [],
    };

    this.state = {
      order,
    };
  }

  addItemToOrder(item) {
    this.setState(state =>
      update(state, {
        order: {
          lineItems: {
            $apply: lineItems => addLineItem(lineItems, item),
          },
        },
      }),
    );
  }

  changeQuantityOfItem(quantity, item) {
    this.setState(state =>
      update(state, {
        order: {
          lineItems: {
            $apply: lineItems => setQuanityOfLineItemById(quantity, lineItems, item.id),
          },
        },
      }),
    );
  }

  render() {
    return (
      <div className="order-form">
        <div className="order-header">
          <h2>Order #{this.state.order.id}</h2>
          <OrderHeader order={this.state.order} />
        </div>
        <Menu items={generateMenu()} selectItem={this.addItemToOrder} />
        <Register
          lineItems={this.state.order.lineItems}
          onChangeQuantityOfItem={this.changeQuantityOfItem}
        />
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
