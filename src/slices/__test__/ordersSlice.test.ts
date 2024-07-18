import { expect, test, describe } from '@jest/globals';
import stellarBurgerSlice, {
  fetchNewOrder,
  initialState
} from '../ordersSlice';

describe('Тест ORDER', () => {
  test('Тест fetchNewOrder pending', () => {
    const mockOrder = ['testid1', 'testid2', 'testid3'];
    const state = stellarBurgerSlice(
      initialState,
      fetchNewOrder.pending('', mockOrder)
    );

    expect(state.orderRequest).toBe(true);
  });

  test('Тест fetchNewOrder rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = stellarBurgerSlice(
      initialState,
      fetchNewOrder.rejected(mockAnswer, '', [''])
    );

    expect(state.orderRequest).toBe(false);
  });

  test('Тест fetchNewOrder fulfilled', () => {
    const mockResponse = {
      success: true,
      name: 'testname',
      order: {
        _id: '664e927097ede0001d06bdb9',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-05-23T00:48:48.039Z',
        updatedAt: '2024-05-23T00:48:48.410Z',
        number: 40680
      }
    };
    const state = stellarBurgerSlice(
      initialState,
      fetchNewOrder.fulfilled(mockResponse, '', [''])
    );

    expect(state.orderModalData).toEqual(mockResponse.order);
    expect(state.orderRequest).toBe(false);
  });
});
