import {createSelector, MemoizedSelector} from "@ngrx/store";
import {CategoriesSelectors} from "./categories-store";
import {ProductsSelectors} from "./products-store";
import {BasketSelectors} from "./basket-store";
import {UserSelectors} from "./user-store";

export const selectError: MemoizedSelector<object, string> = createSelector(
  CategoriesSelectors.selectCategoriesError,
  ProductsSelectors.selectProductsError,
  BasketSelectors.selectBasketsError,
  UserSelectors.selectUserError,
  (categoriesError: string, productsError: string, basketError: string, userError: string) => {
    return categoriesError || productsError || basketError || userError;
  }
);

export const selectIsLoading: MemoizedSelector<object,
  boolean> = createSelector(
  CategoriesSelectors.selectCategoriesIsLoading,
  ProductsSelectors.selectProductsIsLoading,
  BasketSelectors.selectBasketsIsLoading,
  UserSelectors.selectUserError,
  (categories: boolean, products: boolean, basket: boolean, user: boolean) => {
    return categories || products || basket || user;
  }
);
