import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorState,
  orderBurger,
  setRequest,
  resetModal,
} from '../../services/slices/constructorSlice/constructorSlice';
import { getUserState } from '../../services/slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { constructorItems, orderModalData, orderRequest } =
    useSelector(getConstructorState);
  const { isAuthenticated } = useSelector(getUserState);

  const ingredientsIds = useMemo(() => {
    if (!constructorItems.bun) return [];
    const bunId = constructorItems.bun._id;
    const ingredientIds = constructorItems.ingredients.map((i) => i._id);
    return [bunId, ...ingredientIds, bunId];
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun) return;
    dispatch(setRequest(true));
    dispatch(orderBurger(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(resetModal());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
