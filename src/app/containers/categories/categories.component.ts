import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "src/app/models/Category";
import { Store } from "@ngrx/store";
import {
  RootStoreState,
  CategoriesSelectors,
  CategoriesAction
} from "src/app/root-store";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.categories$ = this.store$.select(
      CategoriesSelectors.selectAllCategories
    );

    this.error$ = this.store$.select(CategoriesSelectors.selectCategoriesError);

    this.isLoading$ = this.store$.select(
      CategoriesSelectors.selectCategoriesIsLoading
    );

    this.store$.dispatch(new CategoriesAction.LoadRequestAction());
  }
}
