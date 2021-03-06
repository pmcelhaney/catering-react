import React from 'react';
import PropTypes from 'prop-types';


function UnitCountTextBox({ lineItem, onChange }) {
  let input;
  return (
    <input
      type="number"
      size="3"
      min="0"
      value={lineItem.quantity}
      ref={(ref) => { input = ref; }}
      onChange={() => onChange(+input.value, lineItem.item)}
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


export default UnitCountTextBox;
