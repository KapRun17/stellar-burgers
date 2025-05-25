import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: Record<string, string> = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  let statusColor = '';

  switch (status) {
    case 'pending':
      statusColor = '#E52B1A';
      break;
    case 'done':
      statusColor = '#00CCCC';
      break;
    default:
      statusColor = '#F2F2F3';
  }

  return <OrderStatusUI textStyle={statusColor} text={statusText[status]} />;
};
