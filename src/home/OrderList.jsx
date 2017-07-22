import React from 'react';

import './OrderList.css';

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
            <td>(amount due)</td>
            <td>{order.header.patronCount || 0} people</td>
            <td>{order.header.deliveryMethod}</td>
            <td>(items)</td>
          </tr>
          ),
        )}
      </tbody>
    </table>

  );
}
