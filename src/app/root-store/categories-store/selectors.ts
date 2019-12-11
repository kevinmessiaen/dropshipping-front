import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { categoriesAdapter, State } from "./state";
import { Category } from "src/app/models/Category";
import { isDefined } from "@angular/compiler/src/util";

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectCategoriesState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("categories");

export const selectAllCategories: (
  state: object
) => Category[] = categoriesAdapter.getSelectors(selectCategoriesState)
  .selectAll;

export const selectCategoryById = (id: number) =>
  createSelector(selectAllCategories, (selectAllCategories: Category[]) => {
    if (selectAllCategories) {
      return selectAllCategories.find(p => p.id === id);
    } else {
      return null;
    }
  });

export const selectLeafCategories = () =>
  createSelector(selectAllCategories, (selectAllCategories: Category[]) => {
    if (selectAllCategories) {
      return selectAllCategories.filter(
        p => !isDefined(p.children) || p.children.length === 0
      );
    } else {
      return null;
    }
  });

export const selectCategoryByPath = (path: string) =>
  createSelector(selectAllCategories, (selectAllCategories: Category[]) => {
    if (selectAllCategories) {
      let retour: Category[] = [selectAllCategories.find(p => p.path === path)];
      if (retour)
        while (
          isDefined(retour[retour.length - 1]) &&
          isDefined(retour[retour.length - 1].parent)
        ) {
          retour.push(
            selectAllCategories.find(
              p => p.id === retour[retour.length - 1].parent
            )
          );
        }
      if (retour.length === 1 && !isDefined(retour[0])) {
        return [];
      }
      return retour.reverse();
    } else {
      return null;
    }
  });

export const selectCategoriesError: MemoizedSelector<
  object,
  any
> = createSelector(selectCategoriesState, getError);

export const selectCategoriesIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectCategoriesState, getIsLoading);
