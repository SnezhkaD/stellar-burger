import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';

type TInitialState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  errorText: string;
};

export const initialState: TInitialState = {
  ingredients: [],
  isLoading: false,
  errorText: ''
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setErrorText(state, action: PayloadAction<string>) {
      state.errorText = action.payload;
    },
    deleteErrorText(state) {
      state.errorText = '';
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading,
    selectErrorText: (state) => state.errorText
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.errorText = action.error.message!;
      });
  }
});
export const { selectIngredients, selectIsLoading, selectErrorText } =
  ingredientsSlice.selectors;
export const { setErrorText, deleteErrorText } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
