import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';

import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { deleteCookie, getCookie } from '../../utils/cookie';
import { useEffect } from 'react';
import {
  selectIsOpenModal,
  closeModal
} from '../../slices/constructorItemsSlice';
import {
  selectIngredients,
  fetchIngredients
} from '../../slices/ingredientsSlice';
import { selectOrders, fetchFeed } from '../../slices/ordersSlice';
import {
  getUserThunk,
  init,
  selectIsAuthChecked
} from '../../slices/userSlice';

import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundState = location.state?.background;
  const isOpenModal = useSelector(selectIsOpenModal);
  const token = getCookie('accessToken');
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const ingredients = useSelector(selectIngredients);
  const feed = useSelector(selectOrders);

  useEffect(() => {
    if (!isAuthChecked && token) {
      dispatch(getUserThunk())
        .unwrap()
        .then(() => {
          dispatch(init());
        })
        .catch((e) => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        });
    } else {
      dispatch(init());
    }
  }, []);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  useEffect(() => {
    if (!feed.length) {
      dispatch(fetchFeed());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundState || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>

      {isOpenModal && backgroundState && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => {
                  dispatch(closeModal());
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={'Заказ'}
                  onClose={() => {
                    dispatch(closeModal());
                  }}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'Заказ'}
                onClose={() => {
                  dispatch(closeModal());
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
