import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

describe('Тестирование редьюсера constructorSlice', () => {
  describe('Тестирование экшена addIngredient', () => {
    const initialState = {
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const expectedResult = {
      ...initialState,
      burgerConstructor: {
        bun: {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-04-large.png'
          }
        ]
      }
    };

    test('Добавление ингредиента в конструктор бургера', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa0943',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-04-large.png'
        })
      );

      const ingredient = newState.burgerConstructor.ingredients[0];
      const expectedIngredient =
        expectedResult.burgerConstructor.ingredients[0];

      expect(ingredient).toEqual({
        ...expectedIngredient,
        id: expect.any(String)
      });
    });

    test('Добавление булки в конструктор', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        })
      );

      const bun = newState.burgerConstructor.bun;
      const expectedBun = expectedResult.burgerConstructor.bun;

      expect(bun).toEqual({
        ...expectedBun,
        id: expect.any(String)
      });
    });

    test('Замена булки в конструкторе', () => {
      const initialStateWithBun = {
        burgerConstructor: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            id: 'its so funny =D',
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: []
        },
        loading: false,
        orderRequest: false,
        orderModalData: null,
        error: null
      };
      const expectedResultForBuns = {
        ...initialStateWithBun,
        burgerConstructor: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png'
          },
          ingredients: []
        }
      };
      const newState = constructorSlice(
        initialStateWithBun,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        })
      );

      const bun = newState.burgerConstructor.bun;
      const expectedBun = expectedResultForBuns.burgerConstructor.bun;

      expect(bun).toEqual({
        ...expectedBun,
        id: expect.any(String)
      });
    });
  });

  describe('Тестирование экшена removeIngredient', () => {
    const initialState = {
      burgerConstructor: {
        bun: null,
        ingredients: [
          {
            id: 'funny',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          }
        ]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const expectedResult = {
      ...initialState,
      burgerConstructor: {
        bun: null,
        ingredients: []
      }
    };

    test('Удаление ингредиента из конструктора', () => {
      const newState = constructorSlice(
        initialState,
        removeIngredient('funny')
      );

      const recived = newState.burgerConstructor.ingredients;
      const expected = expectedResult.burgerConstructor.ingredients;

      expect(expected).toEqual(recived);
    });
  });

  describe('Тестирование экшенов перемещения ингредиентов', () => {
    const initialState = {
      burgerConstructor: {
        bun: {
          id: 'funBun',
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: 'funnyPig1',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          },
          {
            id: 'funnyPig2',
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
          },
          {
            id: 'funnyPig3',
            _id: '643d69a5c3f7b9001cfa0947',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
          }
        ]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const expectedResult = {
      ...initialState,
      burgerConstructor: {
        bun: {
          id: 'funBun',
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: 'funnyPig1',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          },
          {
            id: 'funnyPig3',
            _id: '643d69a5c3f7b9001cfa0947',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
          },
          {
            id: 'funnyPig2',
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
          }
        ]
      }
    };

    test('Перемещение ингредиента вверх', () => {
      const newState = constructorSlice(initialState, moveIngredientUp(2));
      const expected = expectedResult.burgerConstructor.ingredients;
      const recived = newState.burgerConstructor.ingredients;

      expect(expected).toEqual(recived);
    });
    test('Перемещение ингредиента вниз', () => {
      const newState = constructorSlice(initialState, moveIngredientDown(1));
      const expected = expectedResult.burgerConstructor.ingredients;
      const recived = newState.burgerConstructor.ingredients;

      expect(expected).toEqual(recived);
    });
  });

  describe('Тестирование асинхронного экшена orderBurger', () => {
    const actions = {
      pending: {
        type: orderBurger.pending.type,
        payload: null
      },
      rejected: {
        type: orderBurger.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: orderBurger.fulfilled.type,
        payload: { order: { number: 404 } }
      }
    };
    test('Тест состояния pending при заказе бургера', () => {
      const state = constructorSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });
    test('Тест состояния rejected при заказе бургера', () => {
      const state = constructorSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
      expect(state.orderModalData).toBe(null);
    });
    test('Тест состояния fulfilled при заказе бургера', () => {
      const state = constructorSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.orderModalData?.number).toBe(
        actions.fulfilled.payload.order.number
      );
    });
  });
});