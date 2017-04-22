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


class OrderForm extends React.Component {

  constructor() {
    super();
    this.order = new Order({
      id: 1,
      name: 'John Doe',
    });
  }


  render() {
    return (
      <div className="order-form">
        <div className="order-header">
          <h2>Order #{this.order.id}</h2>
          <CustomerInformation order={this.order} />
        </div>
        <Menu items={generateMenu()} />
        <Register cart="$ctrl.order.cart" />
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
