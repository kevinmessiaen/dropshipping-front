import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "src/app/models/Category";
import { Store } from "@ngrx/store";
import {
  RootStoreState,
  CategoriesSelectors,
  CategoriesAction,
  RootStoreSelectors
} from "src/app/root-store";
import { ActivatedRoute, Router } from "@angular/router";
import { Basket } from "src/app/models/Basket";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  categoryPath$: Observable<Category[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryPath$ = this.store$.select(
        CategoriesSelectors.selectCategoryByPath(params.path)
      );

      this.categoryPath$.subscribe(c => {});

      this.error$ = this.store$.select(RootStoreSelectors.selectError);
      this.isLoading$ = this.store$.select(RootStoreSelectors.selectIsLoading);
      this.store$.dispatch(new CategoriesAction.LoadRequestAction());
    });
  }
}
