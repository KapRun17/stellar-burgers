import { orderBurgerApi } from '../../../utils/burger-api';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TConstructorState = {
  loading: boolean;
  burgerConstructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

export const initialState: TConstructorState = {
  loading: false,
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const orderBurger = createAsyncThunk(
  'user/order',
  async (data: string[]) => orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  selectors: {
    getConstructorState: (state) => state
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burgerConstructor.bun = action.payload;
        } else {
          state.burgerConstructor.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.burgerConstructor.ingredients =
        state.burgerConstructor.ingredients.filter(
          (i) => i.id !== action.payload
        );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      if (idx > 0) {
        const ingredients = state.burgerConstructor.ingredients;
        ingredients.splice(idx - 1, 0, ingredients.splice(idx, 1)[0]);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      const ingredients = state.burgerConstructor.ingredients;
      if (idx < ingredients.length - 1) {
        ingredients.splice(idx + 1, 0, ingredients.splice(idx, 1)[0]);
      }
    },
    setRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    resetModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order;
        state.burgerConstructor = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  setRequest,
  resetModal
} = constructorSlice.actions;

export const { getConstructorState } = constructorSlice.selectors;
export default constructorSlice.reducer;
