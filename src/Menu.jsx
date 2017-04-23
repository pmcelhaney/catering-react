import React from 'react';
import PropTypes from 'prop-types';


function menuListItem(item, addItemToCart) {
  return (
    <li key={item.id}>
      <button className="menu-item-button" onClick={() => addItemToCart(item)}>{item.name}</button>
    </li>
  );
}

function Menu({ items, addItemToCart }) {
  const listItems = items.map(item => menuListItem(item, addItemToCart));
  return (
    <div className="menu">
      <ol
        className="menu-item-group"
      >
        {listItems}
      </ol>
    </div>
  );
}


Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

export default Menu;
