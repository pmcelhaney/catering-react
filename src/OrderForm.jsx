import React from 'react';
import PropTypes from 'prop-types';

import './order-form.css';
import generateMenu from './generateMenu';
import Menu from './Menu';
import Register from './Register';

import OrderHeader from './OrderHeader';


function OrderForm(props) {
  function fulfillOrderButton() {
    if (props.order.isFulfilled) {
      return '';
    }
    return (
      <button
        type="button"
        onClick={() => props.fulfillOrder(props.order)}
      >Fulfill Order</button>
    );
  }

  function recordPaymentButton() {
    if (props.order.isPaid) {
      return '';
    }
    return (
      <button
        type="button"
        onClick={() => props.recordPayment(props.order)}
      >Record Payment</button>
    );
  }


  return (
    <div className="order-form">
      <button type="button" onClick={props.onClose} className="close-button">ⓧ</button>
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
        discount={props.order.header.discount}
        discountType={props.order.header.discountType}
        onRemoveLineItem={lineItem => props.removeItemFromOrder(lineItem.item, props.order)}
        onChangeQuantityOfItem={
              (quantity, item) =>
              props.changeQuantityOfItemInOrder(quantity, item, props.order)
          }
      />
      <div className="order-actions">
        <button type="button">Print Invoice</button>
        <button type="button">Print Catering Slip</button>
        {fulfillOrderButton()}
        {recordPaymentButton()}
      </div>
    </div>
  );
}

OrderForm.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    lineItems: PropTypes.arrayOf(PropTypes.object),
    header: PropTypes.object,
    isFulfilled: PropTypes.boolean,
    isPaid: PropTypes.boolean,
  }).isRequired,
  onChangeHeaderField: PropTypes.func.isRequired,
  addItemToOrder: PropTypes.func.isRequired,
  changeQuantityOfItemInOrder: PropTypes.func.isRequired,
  removeItemFromOrder: PropTypes.func.isRequired,
  fulfillOrder: PropTypes.func.isRequired,
  recordPayment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderForm;
