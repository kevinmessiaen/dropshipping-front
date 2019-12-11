import { CategoriesState } from "./categories-store";
import { ProductsState } from "./products-store";
import { BasketState } from "./basket-store";

export interface State {
  categories: CategoriesState.State;
  products: ProductsState.State;
  basket: BasketState.State;
}
