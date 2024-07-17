import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi, orderBurgerApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';
import { clearConstructor } from './constructorItemsSlice';

type TInitialState = {
  orders: TOrder[];
  totalOrders: number;
  ordersToday: number;
  orderModalData: TOrder | null;
  orderRequest: boolean;
  errorText: string;
  userOrders: TOrder[] | null;
};

export const initialState: TInitialState = {
  orders: [],
  totalOrders: 0,
  ordersToday: 0,
  orderModalData: null,
  orderRequest: false,
  errorText: '',
  userOrders: null
};

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[], { dispatch }) => {
    const response = await orderBurgerApi(data);
    dispatch(clearConstructor());
    return response;
  }
);

export const fetchUserOrders = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);

export const fetchFeed = createAsyncThunk('user/feed', async () =>
  getFeedsApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeOrderRequest(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    },
    deleteOrders(state) {
      state.orders.length = 0;
    },
    deleteUserOrders(state) {
      state.userOrders = null;
    },
    setErrorText(state, action: PayloadAction<string>) {
      state.errorText = action.payload;
    },
    deleteErrorText(state) {
      state.errorText = '';
    }
  },
  selectors: {
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrders: (state) => state.orders,
    selectTotalOrders: (state) => state.totalOrders,
    selectTodayOrders: (state) => state.ordersToday,
    selectErrorText: (state) => state.errorText,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchNewOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.errorText = action.error.message!;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.ordersToday = action.payload.totalToday;
      });
  }
});

export const {
  selectOrderModalData,
  selectOrderRequest,
  selectOrders,
  selectTotalOrders,
  selectTodayOrders,
  selectErrorText,
  selectUserOrders
} = ordersSlice.selectors;

export const {
  closeOrderRequest,
  deleteOrders,
  setErrorText,
  deleteErrorText,
  deleteUserOrders
} = ordersSlice.actions;
export default ordersSlice.reducer;
