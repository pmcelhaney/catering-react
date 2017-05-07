import React from 'react';
import PropTypes from 'prop-types';

export default function NewOrderButton({ createOrder }) {
  return (
    <button onClick={createOrder}>Create new Order</button>
  );
}

NewOrderButton.propTypes = {
  createOrder: PropTypes.func.isRequired,
};
