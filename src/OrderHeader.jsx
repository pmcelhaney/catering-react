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

      <FormField
        label="Phone"
        name="phone"
        type="phone"
        value={header.phone}
        onChange={handleOrderHeaderFormChange}
      />

      <FormField
        label="Place"
        name="place"
        type="text"
        value={header.place}
        onChange={handleOrderHeaderFormChange}
      />

      <FormField
        label="Date"
        name="date"
        type="date"
        value={header.date}
        onChange={handleOrderHeaderFormChange}
      />

      <FormField
        label="Be there at"
        name="pickupTime"
        type="text"
        value={header.pickupTime}
        onChange={handleOrderHeaderFormChange}
      />


      <FormField
        label="Eat at"
        name="eatTime"
        type="text"
        value={header.eatTime}
        onChange={handleOrderHeaderFormChange}
      />

      <FormField
        label="# People"
        name="patronCount"
        type="text"
        value={header.patronCount}
        onChange={handleOrderHeaderFormChange}
      />


      <div className="form-field">
        <input type="radio" name="where" defaultChecked />Pick up
        <input type="radio" name="where" />Drop off
        <input type="radio" name="where" />Serve
      </div>

      <div className="form-field">
        <label htmlFor="discount">Discount</label>
        <input
          type="number"
          name="discount"
          value={header.discount}
          size="5"
          min="0"
          onChange={handleOrderHeaderFormChange}
        />
        <input
          type="radio"
          name="discountType"
          value="percent"
          checked={header.discountType === 'percent'}
          onChange={handleOrderHeaderFormChange}
        />Percent
        <input
          type="radio"
          name="discountType"
          value="direct"
          checked={header.discountType === 'direct'}
          onChange={handleOrderHeaderFormChange}
        />Dollars
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
