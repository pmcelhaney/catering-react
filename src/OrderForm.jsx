import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

import './order-form.css';
import generateMenu from './generateMenu';
import Menu from './Menu';
import Register from './Register';

import OrderHeader from './OrderHeader';


function OrderForm(props) {
  return (
    <div className="order-form">
      <div className="order-header">
        <h2>Order #{props.order.id}</h2>
        <OrderHeader
          order={props.order}
          changeField={
              (name, value) => props.onChangeHeaderField(props.order, name, value)
            }
        />
      </div>
      <Menu
        items={generateMenu()}
        onSelectItem={item => props.addItemToOrder(item, props.order)}
      />
      <Register
        lineItems={props.order.lineItems}
        onChangeQuantityOfItem={
              (quantity, item) =>
              props.changeQuantityOfItemInOrder(quantity, item, props.order)
          }
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

OrderForm.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    lineItems: PropTypes.arrayOf(PropTypes.object),
    header: PropTypes.object,
  }).isRequired,
  onChangeHeaderField: PropTypes.func.isRequired,
  addItemToOrder: PropTypes.func.isRequired,
  changeQuantityOfItemInOrder: PropTypes.func.isRequired,
};

export default OrderForm;
