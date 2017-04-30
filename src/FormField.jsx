import React from 'react';
import PropTypes from 'prop-types';

// <FormField
//     label="Name"
//     name="name"
//     type="textarea"
//     onChange="handleOrderHeaderFormChange"
//   />;


function FormField({ label, name, value, type, onChange }) {
  const id = `FormField_${name}_${Math.random()}`;
  return (
    <div className="form-field">
      <label htmlFor="{id}">{label}</label>
      <input id={id} name={name} type={type} onChange={onChange} value={value} />
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormField;
