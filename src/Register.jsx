import React from 'react';
import PropTypes from 'prop-types';


function Register() {
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
          <tr ng-repeat="lineItem in $ctrl.cart.lineItems">
            <td>ⓧ</td>
            <td className="unit-count"><input type="number"size="3" min="0" /></td>
            <td className="item-name">lineItem.item.name</td>
            <td className="per-unit-cost price">lineItem.item.unitPrice| currency</td>
            <td className="total price">lineItem.price() | currency </td>
          </tr>
          <tr className="subtotal">
            <th className="footer-label" colSpan="4">Subtotal</th>
            <td className="price">$ctrl.cart.subTotal() | currency </td>
          </tr>
          <tr className="tax">
            <th className="footer-label" colSpan="4">Tax</th>
            <td className="price">$ctrl.cart.salesTax() | currency </td>
          </tr>
          <tr className="total">
            <th className="footer-label" colSpan="4">Cash / Check Total</th>
            <td className="price">$ctrl.cart.total() | currency</td>
          </tr>
          <tr className="total-with-credit-card">
            <th className="footer-label" colSpan="4">Credit Card Total</th>
            <td className="price">$ctrl.cart.totalWithCreditCard() | currency </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


Register.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Register;
