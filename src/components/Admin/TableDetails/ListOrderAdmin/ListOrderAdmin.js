import React from 'react';
import "./ListOrderAdmin.scss";
import { map } from 'lodash';
import { OrderItemAdmin } from '../OrderItemAdmin';

export function ListOrderAdmin(props) {
  const {orders, onReloadOrders} = props;
  return (
    <div className='list-order-admin'>
      {map(orders, (order) => (
        <OrderItemAdmin key={order.id} order={order} onReloadOrders={onReloadOrders}/>
      ))}
    </div>
  )
}
