import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '@store';
import { getFeedState } from '../../services/slices/feedSlice/feedSlice';

const getOrderNumbersByStatus = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useSelector(getFeedState);

  return (
    <FeedInfoUI
      readyOrders={getOrderNumbersByStatus(orders, 'done')}
      pendingOrders={getOrderNumbersByStatus(orders, 'pending')}
      feed={{ orders, total, totalToday }}
    />
  );
};
