import orderSlice, { initialState, getOrderByNumber } from './orderSlice';

describe('Тестирование редьюсера orderSlice', () => {
  describe('Тестирование асинхронного экшена getOrderByNumber', () => {
    const actions = {
      pending: {
        type: getOrderByNumber.pending.type,
        payload: null
      },
      rejected: {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: ['someOrder'] }
      }
    };

    test('Состояние pending при запросе заказа по номеру', () => {
      const nextState = orderSlice(initialState, actions.pending);
      expect(nextState.request).toBe(true);
      expect(nextState.error).toBe(actions.pending.payload);
    });

    test('Состояние rejected при ошибке запроса заказа', () => {
      const nextState = orderSlice(initialState, actions.rejected);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(actions.rejected.error.message);
    });

    test('Состояние fulfilled при успешном получении заказа', () => {
      const nextState = orderSlice(initialState, actions.fulfilled);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.orderData).toBe(actions.fulfilled.payload.orders[0]);
    });
  });
});