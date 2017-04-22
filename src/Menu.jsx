import React from 'react';
import PropTypes from 'prop-types';


function menuListItem(item) {
  return (
    <li>
      <button className="menu-item-button">{item.name}</button>
    </li>
  );
}

function Menu(props) {
  const listItems = props.items.map(menuListItem);
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
};

export default Menu;
