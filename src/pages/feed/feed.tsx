import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeed,
  selectOrders,
  deleteOrders
} from '../../slices/ordersSlice';
import { fetchIngredients } from '../../slices/ingredientsSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchFeed())]);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(deleteOrders());
        dispatch(fetchFeed());
      }}
    />
  );
};
