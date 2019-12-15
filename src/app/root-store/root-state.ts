import { CategoriesState } from "./categories-store";
import { ProductsState } from "./products-store";
import { BasketState } from "./basket-store";
import { UserState } from "./user-store";

export interface State {
  categories: CategoriesState.State;
  products: ProductsState.State;
  basket: BasketState.State;
  user: UserState.State;
}
