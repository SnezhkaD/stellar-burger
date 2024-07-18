import { expect, test, describe } from '@jest/globals';
import stellarBurgerSlice, {
  fetchIngredients,
  initialState
} from '../ingredientsSlice';

describe('Тест INGREDIENTS', () => {
  test('Тест fetchIngredients pending', () => {
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.pending('')
    );

    expect(state.isLoading).toBe(true);
  });

  test('Тест fetchIngredients fulfilled', () => {
    const mockResponse = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.fulfilled(mockResponse, '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockResponse);
  });

  test('Тест fetchIngredients rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchIngredients.rejected(mockAnswer, '')
    );

    expect(state.isLoading).toBe(false);
  });
});
