import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  RootStoreState,
  CategoriesAction,
  CategoriesSelectors
} from "../root-store";
import { Observable } from "rxjs";
import { Category } from "../models/Category";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  private shouldLoad: boolean = true;

  constructor(private store$: Store<RootStoreState.State>) {}

  load() {
    if (this.shouldLoad) {
      this.shouldLoad = false;
      this.store$.dispatch(new CategoriesAction.LoadRequestAction());
    }
  }

  findAll(): Observable<Category[]> {
    return this.store$.select(CategoriesSelectors.selectAllCategories);
  }

  findByPath(path: string): Observable<Category[]> {
    return this.store$.select(CategoriesSelectors.selectCategoryByPath(path));
  }

  findLeafCategories(): Observable<Category[]> {
    return this.store$.select(CategoriesSelectors.selectLeafCategories());
  }

  error(): Observable<boolean> {
    return this.store$.select(CategoriesSelectors.selectCategoriesIsLoading);
  }

  isLoading(): Observable<any> {
    return this.store$.select(CategoriesSelectors.selectCategoriesError);
  }
}
