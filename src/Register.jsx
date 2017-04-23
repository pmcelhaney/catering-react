import React from 'react';
import PropTypes from 'prop-types';
import Calculator from './Calculator';

const calculator = new Calculator({
  salesTaxRate: 0.12,
  creditCardFeeRate: 0.06,
});

const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function formatCurrency(amount) {
  return currencyFormat.format(amount);
}


function UnitCountTextBox({ lineItem, onChange }) {
  return (
    <input
      type="number"
      size="3"
      min="0"
      value={lineItem.quantity}
      onChange={event => onChange(event.target.value, lineItem)}
    />
  );
}

UnitCountTextBox.propTypes = {
  lineItem: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    item: PropTypes.shape({
      name: PropTypes.string,
      unitPrice: PropTypes.number,
    }),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

function changeQuanityOfLineItem(quantity, lineItem) {
  console.log(lineItem.item.name, quantity);
}

function renderLineItem(lineItem) {
  return (
    <tr key={lineItem.item.id}>
      <td>ⓧ</td>
      <td className="unit-count" ><UnitCountTextBox lineItem={lineItem} onChange={changeQuanityOfLineItem} /></td>
      <td className="item-name">{lineItem.item.name}</td>
      <td className="per-unit-cost price">{formatCurrency(lineItem.item.unitPrice)}</td>
      <td className="total price">{formatCurrency(calculator.lineItemTotal(lineItem))}</td>
    </tr>
  );
}


function renderLineItems(items) {
  return items.map(renderLineItem);
}

function Register(props) {
  const cart = props.cart;
  return (
    <div className="register-container">
      <table className="register">
        <thead>
          <tr>
            <th />
            <th className="unit-count">Units {props.cart.lineItems.length}</th>
            <th className="item-name">Item</th>
            <th className="per-unit-cost">Cost/Unit</th>
            <th className="total">Total</th>
          </tr>
        </thead>
        <tbody>
          {renderLineItems(cart.lineItems)}
          <tr className="subtotal">
            <th className="footer-label" colSpan="4">Subtotal</th>
            <td className="price">{formatCurrency(calculator.subTotal(cart.lineItems))}</td>
          </tr>
          <tr className="tax">
            <th className="footer-label" colSpan="4">Tax</th>
            <td className="price">{formatCurrency(calculator.salesTax(cart.lineItems))} </td>
          </tr>
          <tr className="total">
            <th className="footer-label" colSpan="4">Cash / Check Total</th>
            <td className="price">{formatCurrency(calculator.total(cart.lineItems))}</td>
          </tr>
          <tr className="total-with-credit-card">
            <th className="footer-label" colSpan="4">Credit Card Total</th>
            <td className="price">{formatCurrency(calculator.totalWithCreditCard(cart.lineItems))}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


Register.propTypes = {
  cart: PropTypes.shape({
    lineItems: PropTypes.array.isRequired,
  }).isRequired,
};

export default Register;
