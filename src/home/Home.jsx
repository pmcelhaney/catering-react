import React from 'react';
import PropTypes from 'prop-types';

import OrderList from './OrderList';
import NewOrderButton from './NewOrderButton';
import localStore from '../store/LocalStore';


function OrderSearch() {
  return (
    <div>
      <h2>Find an Order</h2>
      <p>You can search for a name, company, phone number, order number, or date.</p>
      <input size="100" />
      <button type="button">Search</button>
    </div>
  );
}

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };


    this.store = localStore;
  }


  render() {
    return (
      <div className="Home">
        <OrderSearch />
        <OrderList orders={this.props.orders} onOpenOrder={this.props.onSelectOrder} />
        <NewOrderButton createOrder={this.props.onCreateOrder} />
      </div>
    );
  }
}

Home.propTypes = {
  onSelectOrder: PropTypes.func.isRequired,
  onCreateOrder: PropTypes.func.isRequired,
//  orders: PropTypes.array.isRequired,
};
