import ingredientSlice, {
  getIngredients,
  initialState
} from './ingredientSlice';

describe('Тестирование редьюсера ingredientSlice', () => {
  describe('Тестирование асинхронного экшена getIngredients', () => {
    const actions = {
      pending: {
        type: getIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: ['ingr1', 'ingr2']
      }
    };

    test('Состояние pending при загрузке ингредиентов', () => {
      const state = ingredientSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    test('Состояние rejected при ошибке загрузки ингредиентов', () => {
      const state = ingredientSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    test('Состояние fulfilled при успешной загрузке ингредиентов', () => {
      const nextState = ingredientSlice(initialState, actions.fulfilled);
      expect(nextState.loading).toBe(false);
      expect(nextState.ingredients).toEqual(actions.fulfilled.payload);
    });
  });
});