import { FC } from 'react';
import styles from './orders-list.module.css';
import { OrderInfoUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrderInfoUIProps> = ({ orderByDate }) => {
  return (
    <div className={styles.content}>
      {orderByDate.map((order) => (
        <OrderCard order={order} key={order._id} />
      ))}
    </div>
  );
};
