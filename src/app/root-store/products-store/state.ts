import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Product } from "src/app/models/Product";

export const productsAdapter: EntityAdapter<Product> = createEntityAdapter<
  Product
>({
  selectId: model => model.id,
  sortComparer: (a: Product, b: Product): number => a.id - b.id
});

export interface State extends EntityState<Product> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = productsAdapter.getInitialState({
  isLoading: false,
  error: null
});
