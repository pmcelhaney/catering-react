import React from 'react';
import PropTypes from 'prop-types';
import Calculator from './calculator/Calculator';
import UnitCountTextBox from './UnitCountTextBox';
import PercentDiscounter from './calculator/PercentDiscounter';
import DirectDiscounter from './calculator/DirectDiscounter';

const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function formatCurrency(amount) {
  return currencyFormat.format(amount);
}


function Register({ lineItems, onChangeQuantityOfItem, discount, discountType }) {
  const discounter = discountType === 'percent' ?
    new PercentDiscounter(discount) :
    new DirectDiscounter(discount);
  const calculator = new Calculator({
    salesTaxRate: 0.12,
    creditCardFeeRate: 0.06,
    discounter,
  });

  function renderLineItem(lineItem) {
    return (
      <tr key={lineItem.item.id}>
        <td>ⓧ</td>
        <td className="unit-count" >
          <UnitCountTextBox lineItem={lineItem} onChange={onChangeQuantityOfItem} />
        </td>
        <td className="item-name">{lineItem.item.name}</td>
        <td className="per-unit-cost price">{formatCurrency(lineItem.item.unitPrice)}</td>
        <td className="total price">{formatCurrency(calculator.lineItemTotal(lineItem))}</td>
      </tr>
    );
  }

  function optionalDiscountLine() {
    if (discounter.hasValue()) {
      return (
        <tr className="discount">
          <th className="footer-label" colSpan="4">Discount {discounter.label()}</th>
          <td className="price">{formatCurrency(-calculator.discount(lineItems))}</td>
        </tr>
      );
    }
    return null;
  }

  return (
    <div className="register-container">
      <table className="register">
        <thead>
          <tr>
            <th />
            <th className="unit-count">Units</th>
            <th className="item-name">Item</th>
            <th className="per-unit-cost">Cost/Unit</th>
            <th className="total">Total</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map(renderLineItem)}
          {optionalDiscountLine()}
          <tr className="subtotal">
            <th className="footer-label" colSpan="4">Subtotal</th>
            <td className="price">{formatCurrency(calculator.subTotal(lineItems))}</td>
          </tr>
          <tr className="tax">
            <th className="footer-label" colSpan="4">Tax</th>
            <td className="price">{formatCurrency(calculator.salesTax(lineItems))} </td>
          </tr>
          <tr className="total">
            <th className="footer-label" colSpan="4">Cash / Check Total</th>
            <td className="price">{formatCurrency(calculator.total(lineItems))}</td>
          </tr>
          <tr className="total-with-credit-card">
            <th className="footer-label" colSpan="4">Credit Card Total</th>
            <td className="price">{formatCurrency(calculator.totalWithCreditCard(lineItems))}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


Register.propTypes = {
  lineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeQuantityOfItem: PropTypes.func.isRequired,
};

export default Register;
