import React from 'react';
import PropTypes from 'prop-types';
import Order from './Order';


function CustomerInformation(props) {
  return (
    <div className="customer-information">
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <textarea name="place" rows="2" cols="30" value={props.order.name} readOnly />
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

CustomerInformation.propTypes = {
  order: PropTypes.instanceOf(Order).isRequired,
};

export default CustomerInformation;
