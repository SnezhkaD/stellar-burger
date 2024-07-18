import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import constructorItemsSlice, {
  addIngredient,
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp,
  selectConstructorItems
} from '../constructorItemsSlice';
import { mockData, mockIngredient, mockBun } from '../../mocks/mock';

function initStore() {
  return configureStore({
    reducer: {
      constructorItems: constructorItemsSlice
    },
    preloadedState: {
      constructorItems: mockData
    }
  });
}

describe('Тест CONSTRUCTOR', () => {
  test('Тест deleteIngredient', () => {
    const store = initStore();
    const before = selectConstructorItems(store.getState()).ingredients.length;
    store.dispatch(deleteIngredient(mockIngredient));
    const after = selectConstructorItems(store.getState()).ingredients.length;
    expect(before).toBe(3);
    expect(after).toBe(2);
  });

  test('Тест addIngredient', () => {
    const store = initStore();
    store.dispatch(addIngredient(mockIngredient));
    store.dispatch(addIngredient(mockBun));

    const constructor = selectConstructorItems(store.getState());
    expect(constructor.ingredients.length).toEqual(4);
    expect(constructor.bun.name === 'Краторная булка N-200i');
  });

  test('Тест moveIngredientUp', () => {
    const store = initStore();
    let ingredients = selectConstructorItems(store.getState()).ingredients;
    const lastIngredient = ingredients[ingredients.length - 1];

    store.dispatch(moveIngredientUp(lastIngredient));

    ingredients = selectConstructorItems(store.getState()).ingredients;

    expect(ingredients[ingredients.length - 2]).toEqual(lastIngredient);
  });

  test('Тест moveIngredientDown', () => {
    const store = initStore();
    let ingredients = selectConstructorItems(store.getState()).ingredients;
    const firstIngredient = ingredients[0];

    store.dispatch(moveIngredientDown(firstIngredient));

    ingredients = selectConstructorItems(store.getState()).ingredients;

    expect(ingredients[1]).toEqual(firstIngredient);
  });
});
