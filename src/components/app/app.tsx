import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '@store';
import { getUser } from '../../services/slices/userSlice/userSlice';
import { getIngredients } from '../../services/slices/ingredientSlice/ingredientSlice';
import { CenteringComponent } from '../centering-component/centering-component';
import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  const renderOrderInfo = (title: string) => (
    <CenteringComponent title={title}>
      <OrderInfo />
    </CenteringComponent>
  );

  const renderModal = (title: string, element: JSX.Element) => (
    <Modal title={title} onClose={() => history.back()}>
      {element}
    </Modal>
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <CenteringComponent title='Детали ингредиента'>
              <IngredientDetails />
            </CenteringComponent>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={renderOrderInfo(`#${location.pathname.match(/\d+/)}`)}
        />
        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute onlyUnAuth={false} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={renderOrderInfo(`#${location.pathname.match(/\d+/)}`)}
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={renderModal('Детали ингредиента', <IngredientDetails />)}
          />
          <Route
            path='/feed/:number'
            element={renderModal(
              `#${location.pathname.match(/\d+/)}`,
              <OrderInfo />
            )}
          />
          <Route element={<ProtectedRoute onlyUnAuth={false} />}>
            <Route
              path='/profile/orders/:number'
              element={renderModal(
                `#${location.pathname.match(/\d+/)}`,
                <OrderInfo />
              )}
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
