import React from 'react';

import './OrderList.css';

function printLineItems(lineItems) {
  return lineItems.map(lineItem => `${lineItem.item.name} (${lineItem.quantity})`).join(',');
}

export default function OrderList({ orders, onOpenOrder }) {
  return (
    <table className="OrderList">
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td><button onClick={() => onOpenOrder(order)}>Open</button></td>
            <td><button>Duplicate</button></td>
            <td>#{order.id}</td>
            <td>{order.header.date}</td>
            <td>{order.header.name}</td>
            <td>{order.isPaid ? 'paid' : '$xx.xx'}</td>
            <td>{order.header.patronCount || 0} people</td>
            <td>{order.header.deliveryMethod}</td>
            <td>{printLineItems(order.lineItems)}</td>
          </tr>
          ),
        )}
      </tbody>
    </table>

  );
}
