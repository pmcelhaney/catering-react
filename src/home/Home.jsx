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

  componentDidMount() {
    setTimeout(() =>
    this.setState({
      orders: [
        {
          id: 12200,
          date: '2017-01-16',
          name: 'Forest Gump',
          amountDue: 328.47,
          patronCount: 30,
          deliveryMethod: 'pickup',
          itemsAsString: 'Baked chicken, green beans, mac and cheese, corn bread, banana pudding',
        },
        {
          id: 12201,
          date: '2017-01-16',
          name: 'Forest Gump',
          amountDue: 328.47,
          patronCount: 30,
          deliveryMethod: 'pickup',
          itemsAsString: 'Baked chicken, green beans, mac and cheese, corn bread, banana pudding',
        },
        {
          id: 12202,
          date: '2017-01-16',
          name: 'Forest Gump',
          amountDue: 328.47,
          patronCount: 30,
          deliveryMethod: 'pickup',
          itemsAsString: 'Baked chicken, green beans, mac and cheese, corn bread, banana pudding',
        },
      ],

    }), 1000);
  }


  render() {
    return (
      <div className="Home">
        <OrderSearch />
        <OrderList orders={this.state.orders} />
        <NewOrderButton createOrder={this.props.onCreateOrder} />
      </div>
    );
  }
}

Home.propTypes = {
  onSelectOrder: PropTypes.func.isRequired,
  onCreateOrder: PropTypes.func.isRequired,
};
