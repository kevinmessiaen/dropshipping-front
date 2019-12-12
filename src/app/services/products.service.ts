import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { RootStoreState } from "../root-store";
import {
  ProductsAction,
  ProductsSelectors
} from "../root-store/products-store";
import { Product } from "../models/Product";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private shouldLoad: boolean = true;

  constructor(private store$: Store<RootStoreState.State>) {}

  load() {
    if (this.shouldLoad) {
      this.shouldLoad = false;
      this.store$.dispatch(new ProductsAction.LoadRequestAction());
    }
  }

  findAll(): Observable<Product[]> {
    return this.store$.select(ProductsSelectors.selectAllProducts);
  }

  findByCategoryId(categoryId: number): Observable<Product[]> {
    return this.store$.select(
      ProductsSelectors.selectAllProductsByCategoryId(categoryId)
    );
  }

  error(): Observable<boolean> {
    return this.store$.select(ProductsSelectors.selectProductsIsLoading);
  }

  isLoading(): Observable<any> {
    return this.store$.select(ProductsSelectors.selectProductsError);
  }
}
