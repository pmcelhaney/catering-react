  import React from 'react';

  import './order-form.css';
  import Menu from './Menu';
  import Register from './Register';

  import CustomerInformation from './CustomerInformation';

  function generateMenu() {
    const items = [
      {
        id: 1,
        name: 'BBQ',
        unitPrice: 4,
        categories: [
          'lunch',
          'dinner',
        ],
      },
      {
        id: 2,
        name: 'Baked beans',
        unitPrice: 2.50,
        categories: [
          'breakfast',
          'lunch',
          'dinner',
        ],
      },
      {
        id: 3,
        name: 'Buns',
        unitPrice: 0.50,
        categories: [
          'lunch',
        ],
      },
      {
        id: 4,
        name: 'Eggs',
        unitPrice: 2.75,
        categories: [
          'breakfast',
          'lunch',
        ],
      },
    ];

    for (let i = 5; i < 40; i += 1) {
      items.push({
        id: i,
        name: 'Another Item',
        unitPrice: Math.floor(Math.random() * 50) / 4,
      });
    }
    return items;
  }


  function setQuanityOfLineItemById(lineItems, id, quantity) {
    return lineItems.map((lineItem) => {
      if (lineItem.item.id === id) {
        return Object.assign({}, lineItem, { quantity });
      }
      return lineItem;
    });
  }

  function incrementQuanityOfLineItemById(lineItems, id) {
    return lineItems.map((lineItem) => {
      if (lineItem.item.id === id) {
        return Object.assign({}, lineItem, { quantity: lineItem.quantity + 1 });
      }
      return lineItem;
    });
  }

  function addLineItem(lineItems, item) {
    const existingLineItem = lineItems.find(li => li.item.id === item.id);
    if (existingLineItem) {
      return incrementQuanityOfLineItemById(lineItems, item.id);
    }
    return lineItems.concat([{ quantity: 1, item }]);
  }


  class OrderForm extends React.Component {

    constructor() {
      super();

      this.addItemToOrder = this.addItemToOrder.bind(this);
      this.changeQuantityOfItem = this.changeQuantityOfItem.bind(this);

      const order = {
        id: 1,
        header: {
          name: 'John Q. Doe',
        },
        lineItems: [],
      };

      this.state = {
        order,
      };
    }

    addItemToOrder(item) {
      this.setState(state =>
      ({
        order: {
          lineItems: addLineItem(state.order.lineItems, item),
        },
      }),
    );
    }

    changeQuantityOfItem(quantity, item) {
      this.setState(state =>
      ({
        order: {
          lineItems: setQuanityOfLineItemById(state.order.lineItems, item.id, quantity),
        },
      }),
    );
    }

    render() {
      return (
        <div className="order-form">
          <div className="order-header">
            <h2>Order #{this.state.order.id}</h2>
            <CustomerInformation order={this.state.order.header} />
          </div>
          <Menu items={generateMenu()} selectItem={this.addItemToOrder} />
          <Register
            lineItems={this.state.order.lineItems}
            onChangeQuantityOfItem={this.changeQuantityOfItem}
          />
          <div className="order-actions">
            <button type="button">Print Invoice</button>
            <button type="button">Print Catering Slip</button>
            <button type="button">Fulfill Order</button>
            <button type="button">Record Payment</button>
          </div>
        </div>
      );
    }
}

  export default OrderForm;
