import userSlice, {
  getUser,
  getOrdersAll,
  initialState,
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from './userSlice';

describe('Тестирование редьюсера userSlice', () => {
  describe('Тестирование асинхронного экшена getUser', () => {
    const actions = {
      pending: {
        type: getUser.pending.type,
        payload: null
      },
      rejected: {
        type: getUser.rejected.type,
        payload: null
      },
      fulfilled: {
        type: getUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      }
    };

    test('Состояние pending при запросе данных пользователя', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.request).toBe(false);
      expect(state.error).toBe(actions.pending.payload);
    });

    test('Состояние rejected при ошибке запроса данных пользователя', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.request).toBe(false);
      expect(state.error).toBe(actions.rejected.payload);
    });

    test('Состояние fulfilled при успешном получении данных пользователя', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.request).toBe(false);
      expect(nextState.userData).toEqual(actions.fulfilled.payload.user);
    });
  });

  describe('Тестирование асинхронного экшена getOrdersAll', () => {
    const actions = {
      pending: {
        type: getOrdersAll.pending.type,
        payload: null
      },
      rejected: {
        type: getOrdersAll.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getOrdersAll.fulfilled.type,
        payload: ['order1', 'order2']
      }
    };

    test('Состояние pending при запросе списка заказов', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.request).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    test('Состояние rejected при ошибке запроса списка заказов', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.request).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    test('Состояние fulfilled при успешном получении списка заказов', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.request).toBe(false);
      expect(nextState.userOrders).toEqual(actions.fulfilled.payload);
    });
  });

  describe('Тестирование асинхронного экшена registerUser', () => {
    const actions = {
      pending: {
        type: registerUser.pending.type,
        payload: null
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      }
    };

    test('Состояние pending при регистрации пользователя', () => {
      const nextState = userSlice(initialState, actions.pending);
      expect(nextState.request).toBe(true);
      expect(nextState.error).toBe(actions.pending.payload);
    });

    test('Состояние rejected при ошибке регистрации', () => {
      const nextState = userSlice(initialState, actions.rejected);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(actions.rejected.error.message);
    });

    test('Состояние fulfilled при успешной регистрации', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.userData).toBe(actions.fulfilled.payload.user);
    });
  });

  describe('Тестирование асинхронного экшена loginUser', () => {
    const actions = {
      pending: {
        type: loginUser.pending.type,
        payload: null
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      }
    };

    test('Состояние pending при авторизации пользователя', () => {
      const nextState = userSlice(initialState, actions.pending);
      expect(nextState.loginUserRequest).toBe(true);
      expect(nextState.isAuthChecked).toBe(true);
      expect(nextState.isAuthenticated).toBe(false);
      expect(nextState.error).toBe(actions.pending.payload);
    });

    test('Состояние rejected при ошибке авторизации', () => {
      const nextState = userSlice(initialState, actions.rejected);
      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.isAuthenticated).toBe(false);
      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.error).toBe(actions.rejected.error.message);
    });

    test('Состояние fulfilled при успешной авторизации', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.userData).toBe(actions.fulfilled.payload.user);
    });
  });

  describe('Тестирование асинхронного экшена updateUser', () => {
    const actions = {
      pending: {
        type: updateUser.pending.type,
        payload: null
      },
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      }
    };

    test('Состояние pending при обновлении данных пользователя', () => {
      const nextState = userSlice(initialState, actions.pending);
      expect(nextState.request).toBe(true);
      expect(nextState.error).toBe(actions.pending.payload);
    });

    test('Состояние rejected при ошибке обновления данных', () => {
      const nextState = userSlice(initialState, actions.rejected);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(actions.rejected.error.message);
    });

    test('Состояние fulfilled при успешном обновлении данных', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.response).toBe(actions.fulfilled.payload.user);
    });
  });

  describe('Тестирование асинхронного экшена logoutUser', () => {
    const actions = {
      pending: {
        type: logoutUser.pending.type,
        payload: null
      },
      rejected: {
        type: logoutUser.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: logoutUser.fulfilled.type,
        payload: null
      }
    };

    test('Состояние pending при выходе из системы', () => {
      const nextState = userSlice(initialState, actions.pending);
      expect(nextState.request).toBe(true);
      expect(nextState.isAuthChecked).toBe(true);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.error).toBe(actions.pending.payload);
    });

    test('Состояние rejected при ошибке выхода из системы', () => {
      const nextState = userSlice(initialState, actions.rejected);
      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(actions.rejected.error.message);
    });

    test('Состояние fulfilled при успешном выходе из системы', () => {
      const nextState = userSlice(initialState, actions.fulfilled);
      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.isAuthenticated).toBe(false);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.userData).toBe(actions.fulfilled.payload);
    });
  });
});