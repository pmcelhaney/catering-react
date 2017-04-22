import React from 'react';
import './order-form.css';
import Order from './Order';

import CustomerInformation from './CustomerInformation';


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
      <div>
        <div className="order-header">
          <h2>Order #{this.order.id}</h2>
          <CustomerInformation order={this.order} />
        </div>
        <mwc-menu menu="$ctrl.menu" select-item="$ctrl.order.cart.addItem(item)" />
        <mwc-register cart="$ctrl.order.cart" />
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
