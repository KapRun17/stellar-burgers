import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '@store';
import {
  getOrdersAll,
  getUserState
} from '../../services/slices/userSlice/userSlice';
import { getFeeds } from '../../services/slices/feedSlice/feedSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders, request: isLoading } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getOrdersAll());
    dispatch(getFeeds());
  }, [dispatch]);

  return isLoading ? <Preloader /> : <ProfileOrdersUI orders={userOrders} />;
};
