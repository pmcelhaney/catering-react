import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';

// <FormField
//     label="Name"
//     name="name"
//     type="textarea"
//     onChange="handleOrderHeaderFormChange"
//   />;


function OrderHeader({ order, changeField }) {
  const header = order.header;


  function handleOrderHeaderFormChange({ target }) {
    changeField(target.name, target.value);
    // console.log('handleOrderHeaderFormChange', target.name, target.value, target.type);
  }


  return (
    <div className="customer-information">
      <FormField
        label="Name"
        name="name"
        type="text"
        value={header.name}
        onChange={handleOrderHeaderFormChange}
      />

      <div className="form-field">
        <label htmlFor="name">Name</label>
        <textarea name="place" rows="2" cols="30" value={header.name} readOnly />
      </div>

      <div className="form-field">
        <label htmlFor="phone">Phone</label>
        <input name="phone" size="15" />
      </div>

      <div className="form-field">
        <label htmlFor="place">Place</label>
        <textarea name="place" rows="4" cols="30" />
      </div>

      <div className="form-field">
        <label htmlFor="date">Date</label>
        <input name="date" size="10" />&#128467;
      </div>

      <div className="form-field">
        <label htmlFor="pickUpTime">Be there at</label>
        <input size="10" />
      </div>

      <div className="form-field">
        <label htmlFor="eatTime">Eat at</label>
        <input size="10" />
      </div>

      <div className="form-field">
        <label htmlFor="patronCount"># People</label>
        <input name="patronCount" size="5" />
      </div>

      <div className="form-field">
        <input type="radio" name="where" defaultChecked />Pick up
        <input type="radio" name="where" />Drop off
        <input type="radio" name="where" />Serve
      </div>

      <div className="form-field">
        <label htmlFor="discount">Discount</label>
        <input type="number" name="discount" value="" size="5" />
        <input type="radio" name="discountType" value="percent" defaultChecked />Percent
        <input type="radio" name="discountType" value="absolute" />Dollars
      </div>
    </div>
  );
}

OrderHeader.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    header: PropTypes.Object,
  }).isRequired,
  changeField: PropTypes.func.isRequired,
};

export default OrderHeader;
