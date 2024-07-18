import { expect, test, describe } from '@jest/globals';
import userSlice, {
  fetchLoginUser,
  fetchRegisterUser,
  fetchUpdateUser,
  fetchLogout,
  getUserThunk,
  initialState
} from '../userSlice';

describe('Тест USER', () => {
  test('Test getUserThunk pending', () => {
    const state = userSlice(initialState, getUserThunk.pending(''));

    expect(state.isLoading).toBe(true);
  });

  test('Тест getUserThunk fullfiled', () => {
    const mockResponse = {
      success: true,
      user: { name: 'user', email: 'user@mail.ru' }
    };
    const state = userSlice(
      initialState,
      getUserThunk.fulfilled(mockResponse, '')
    );

    expect(state.user).toEqual(mockResponse.user);
  });

  test('Тест getUserTnunk rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = userSlice(
      initialState,
      getUserThunk.rejected(mockAnswer, '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.user).toEqual({ name: '', email: '' });
  });

  test('Тест fetchLoginUser pending', () => {
    const state = userSlice(
      initialState,
      fetchLoginUser.pending('', { email: 'test@mail.ru', password: 'test' })
    );

    expect(state.isLoading).toBe(true);
  });

  test('Тест fetchLoginUser rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = userSlice(
      initialState,
      fetchLoginUser.rejected(mockAnswer, '', {
        email: 'test@mail.ru',
        password: 'test'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.errorText).toBe('error');
  });

  test('Тест fetchLoginUser fulfiled', () => {
    const state = userSlice(
      initialState,
      fetchLoginUser.fulfilled(
        {
          success: true,
          refreshToken: 'testtoken',
          accessToken: 'testaccess',
          user: { name: 'testuser', email: 'testuser@mail.ru' }
        },
        '',
        { password: 'testuser', email: 'testuser@mail.ru' }
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Тест fetchRegisterUser pending', () => {
    const state = userSlice(
      initialState,
      fetchRegisterUser.pending(
        '',
        { name: 'user', email: 'test@mail.ru', password: 'test' },
        ''
      )
    );

    expect(state.isLoading).toBe(true);
  });

  test('Тест fetchRegisterUser rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    const state = userSlice(
      initialState,
      fetchRegisterUser.rejected(mockAnswer, '', {
        name: 'user',
        email: 'test@mail.ru',
        password: 'test'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.errorText).toBe('error');
  });

  test('Тест fetchRegisterUser fulfilled', () => {
    const state = userSlice(
      initialState,
      fetchRegisterUser.fulfilled(
        {
          success: true,
          refreshToken: 'testtoken',
          accessToken: 'testaccess',
          user: { name: 'testuser', email: 'testuser@mail.ru' }
        },
        '',
        { name: 'user', password: 'testuser', email: 'testuser@mail.ru' }
      )
    );

    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test('Тест fetchLogout pending', () => {
    const state = userSlice(initialState, fetchLogout.pending(''));
    expect(state.isLoading).toBe(true);
  });

  test('Тест fetchLogout rejected', () => {
    const mockError = { name: 'test', message: 'error' };
    const state = userSlice(initialState, fetchLogout.rejected(mockError, ''));

    expect(state.isLoading).toBe(false);
  });

  test('Тест fetchLogout fulfilled', () => {
    const mockAnswer = { success: true };
    const state = userSlice(
      initialState,
      fetchLogout.fulfilled(mockAnswer, '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.isAuthChecked).toBe(false);
  });

  test('Тест fetchUpdateUser pending', () => {
    const state = userSlice(
      initialState,
      fetchUpdateUser.pending('', { name: 'test' })
    );
    expect(state.isLoading).toBe(true);
  });

  test('Тест fetchUpdateUser rejected', () => {
    const mockError = { name: 'test', message: 'error' };
    const state = userSlice(
      initialState,
      fetchUpdateUser.rejected(mockError, '', { name: 'test' })
    );
    expect(state.isLoading).toBe(false);
  });

  test('Тест fetchUpdateUser fulfilled', () => {
    const mockUser = { name: 'testuser', email: 'changeEmail@mail.ru' };
    const mockResponse = {
      success: true,
      user: mockUser
    };
    const state = userSlice(
      initialState,
      fetchUpdateUser.fulfilled(mockResponse, '', mockUser)
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
  });
});
