import React from 'react';
import PropTypes from 'prop-types';


function menuListItem(item, onSelectItem) {
  return (
    <li key={item.id}>
      <button className="menu-item-button" onClick={() => onSelectItem(item)}>{item.name}</button>
    </li>
  );
}

function Menu({ items, onSelectItem }) {
  return (
    <div className="menu">
      <ol
        className="menu-item-group"
      >
        {items.map(item => menuListItem(item, onSelectItem))}
      </ol>
    </div>
  );
}


Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

export default Menu;
