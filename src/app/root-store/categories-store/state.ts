import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Category } from "src/app/models/Category";

export const categoriesAdapter: EntityAdapter<Category> = createEntityAdapter<
  Category
>({
  selectId: model => model.id,
  sortComparer: (a: Category, b: Category): number => a.id - b.id
});

export interface State extends EntityState<Category> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = categoriesAdapter.getInitialState({
  isLoading: false,
  error: null
});
