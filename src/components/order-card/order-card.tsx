import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '@store';
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice';

const MAX_INGREDIENTS = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const { ingredients } = useSelector(getIngredientState);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients
      .map((id) => ingredients.find((ing) => ing._id === id))
      .filter(Boolean) as TIngredient[];

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow: ingredientsInfo.slice(0, MAX_INGREDIENTS),
      remains: Math.max(0, ingredientsInfo.length - MAX_INGREDIENTS),
      total,
      date: new Date(order.createdAt)
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={MAX_INGREDIENTS}
      locationState={{ background: location }}
    />
  );
});
