import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructorState,
  orderBurger,
  setRequest,
  resetModal
} from '../../services/slices/constructorSlice/constructorSlice';
import { getUserState } from '../../services/slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { burgerConstructor, orderModalData, orderRequest } =
    useSelector(getConstructorState);
  const { isAuthenticated } = useSelector(getUserState);

  const ingredientsIds = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    if (!bun) return [];

    const bunId = bun._id;
    const ingredientIds = ingredients.map((ingredient) => ingredient._id);
    return [bunId, ...ingredientIds, bunId];
  }, [burgerConstructor]);

  const totalPrice = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [burgerConstructor]);

  const handleOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!burgerConstructor.bun) return;

    dispatch(setRequest(true));
    dispatch(orderBurger(ingredientsIds));
  };

  const handleCloseModal = () => {
    dispatch(setRequest(false));
    dispatch(resetModal());
  };

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      burgerConstructor={burgerConstructor}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseModal}
    />
  );
};
