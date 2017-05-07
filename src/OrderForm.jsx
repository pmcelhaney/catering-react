import React from 'react';
import update from 'immutability-helper';


import './order-form.css';
import generateMenu from './generateMenu';
import Menu from './Menu';
import Register from './Register';

import OrderHeader from './OrderHeader';


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


class OrderForm extends React.Component {

  constructor(props) {
    super();

    this.addItemToOrder = this.addItemToOrder.bind(this);
    this.changeQuantityOfItem = this.changeQuantityOfItem.bind(this);
    this.changeHeaderField = this.changeHeaderField.bind(this);


    const order = props.order;

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
            $apply: lineItems => setQuantityOfLineItemById(quantity, lineItems, item.id),
          },
        },
      }),
    );
  }


  changeHeaderField(name, value) {
    this.setState(state =>
      update(state, {
        order: {
          header: {
            [name]: {
              $set: value,
            },
          },
        },
      }),
    );
  }

  render() {
    console.log(this.state);
    return (
      <div className="order-form">
        <div className="order-header">
          <h2>Order #{this.state.order.id}</h2>
          <OrderHeader order={this.state.order} changeField={this.changeHeaderField} />
        </div>
        <Menu items={generateMenu()} onSelectItem={this.addItemToOrder} />
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
