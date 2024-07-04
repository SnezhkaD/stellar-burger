import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TIngredient,
  TConstructorItems,
  TIngredientItem
} from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

type TInitialState = {
  constructorItems: TConstructorItems;
  isOpenModal: boolean;
};

const initialState: TInitialState = {
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  },
  isOpenModal: false
};

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          uniqueId: uuidv4()
        });
      }
    },
    deleteIngredient(state, action: PayloadAction<TIngredientItem>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, index) => index !== ingredientIndex
        );
    },
    moveIngredientUp(state, action: PayloadAction<TIngredientItem>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      const prevItem = state.constructorItems.ingredients[ingredientIndex - 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex - 1,
        2,
        action.payload,
        prevItem
      );
    },
    moveIngredientDown(state, action: PayloadAction<TIngredientItem>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      const nextItem = state.constructorItems.ingredients[ingredientIndex + 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex,
        2,
        nextItem,
        action.payload
      );
    },
    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
    },
    clearConstructor(state) {
      state.constructorItems = {
        bun: {
          price: 0
        },
        ingredients: []
      };
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectIsOpenModal: (state) => state.isOpenModal
  }
});
export const { selectConstructorItems, selectIsOpenModal } =
  constructorItemsSlice.selectors;

export const {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  openModal,
  closeModal,
  clearConstructor
} = constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
