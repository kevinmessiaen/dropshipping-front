import { createSelector, MemoizedSelector } from "@ngrx/store";
import { CategoriesSelectors } from "./categories-store";
import { ProductsSelectors } from "./products-store";
import { BasketSelectors } from "./basket-store";

export const selectError: MemoizedSelector<object, string> = createSelector(
  CategoriesSelectors.selectCategoriesError,
  ProductsSelectors.selectProductsError,
  BasketSelectors.selectBasketsError,
  (categoriesError: string, productsError: string, basketError: string) => {
    return categoriesError || productsError || basketError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  CategoriesSelectors.selectCategoriesIsLoading,
  ProductsSelectors.selectProductsIsLoading,
  BasketSelectors.selectBasketsIsLoading,
  (categories: boolean, products: boolean, basket: boolean) => {
    return categories || products || basket;
  }
);
