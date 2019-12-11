import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { State } from "./state";
import { Basket } from "src/app/models/Basket";

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

const getBasket = (state: State): any => state.basket;

export const selectBasketState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("baskets");

export const selectBasketsError: MemoizedSelector<object, any> = createSelector(
  selectBasketState,
  getError
);

export const selectBasketsIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectBasketState, getIsLoading);

export const selectBasket: MemoizedSelector<object, Basket> = createSelector(
  selectBasketState,
  getBasket
);
