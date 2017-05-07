import React from 'react';

import './OrderList.css';

export default function OrdersList({ orders }) {
  return (
    <table className="OrderList">
      <tbody>
        {orders.map(order => (<tr key={order.id}>
          <td>Open</td>
          <td>Duplicate</td>
          <td>#{order.id}</td>
          <td>{order.date}</td>
          <td>{order.name}</td>
          <td>{order.amountDue}</td>
          <td>{order.patronCount} people</td>
          <td>{order.deliveryMethod}</td>
          <td>{order.itemsAsString}</td>
        </tr>))}
      </tbody>
    </table>

  );
}
