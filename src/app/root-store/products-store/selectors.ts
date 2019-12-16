import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { productsAdapter, State } from "./state";
import { Product } from "src/app/models/Product";
import { Basket } from "src/app/models/Basket";

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectProductsState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("products");

export const selectAllProducts: (
  state: object
) => Product[] = productsAdapter.getSelectors(selectProductsState).selectAll;

export const selectAllProductsByCategoryId = (id: number) =>
  createSelector(selectAllProducts, (selectAllProducts: Product[]) => {
    if (selectAllProducts) {
      return selectAllProducts.filter(p => p.categoryId === id);
    } else {
      return null;
    }
  });

export const selectAllProductsByCategoryIds = (ids: number[]) =>
  createSelector(selectAllProducts, (selectAllProducts: Product[]) => {
    if (selectAllProducts) {
      return selectAllProducts.filter(p => ids.includes(p.categoryId));
    } else {
      return null;
    }
  });

export const selectAllProductsInBasket = (basket: Basket) =>
  createSelector(selectAllProducts, (selectAllProducts: Product[]) => {
    if (selectAllProducts) {
      return selectAllProducts.filter(p => basket.products.has(p.id));
    } else {
      return null;
    }
  });

export const selectProductsError: MemoizedSelector<
  object,
  any
> = createSelector(selectProductsState, getError);

export const selectProductsIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectProductsState, getIsLoading);
