import feedSlice, { getFeeds, initialState } from './feedSlice';

describe('Тестирование редьюсера feedSlice', () => {
  describe('Тестирование асинхронного экшена getFeeds', () => {
    const actions = {
      pending: {
        type: getFeeds.pending.type,
        payload: null
      },
      rejected: {
        type: getFeeds.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getFeeds.fulfilled.type,
        payload: { orders: ['order1', 'order2'] }
      }
    };

    test('Состояние pending при загрузке ленты заказов', () => {
      const state = feedSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    test('Состояние rejected при ошибке загрузки ленты', () => {
      const state = feedSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    test('Состояние fulfilled при успешной загрузке ленты', () => {
      const nextState = feedSlice(initialState, actions.fulfilled);
      expect(nextState.loading).toBe(false);
      expect(nextState.orders).toEqual(actions.fulfilled.payload.orders);
    });
  });
});