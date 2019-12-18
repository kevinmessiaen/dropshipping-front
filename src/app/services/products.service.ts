import { Injectable, EventEmitter } from "@angular/core";
import { CategoriesService } from "./categories.service";
import { Product } from "../models/Product";
import { DataService } from "./data.service";
import { BasketService } from "./basket.service";
import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private _products: Product[];
  products$: EventEmitter<Product[]> = new EventEmitter();

  constructor(
    dataService: DataService,
    private categoriesService: CategoriesService,
    private basketService: BasketService
  ) {
    dataService.getProducts().subscribe(p => (this.products = p));
  }

  set products(products: Product[]) {
    this._products = products;
    this.products$.emit(this._products);
  }

  getByCategoryId(id: number): Observable<Product[]> {
    return combineLatest(
      this.products$.pipe(),
      this.categoriesService.findDeepChildren(id)
    ).pipe(
      map(([products, ids]) => {
        console.log(ids);
        return products.filter(p => ids.includes(p.categoryId));
      })
    );
  }

  getByUserBasket(): Observable<Product[]> {
    return combineLatest(
      this.products$.pipe(),
      this.basketService.basket$.pipe()
    ).pipe(
      map(([products, basket]) =>
        products.filter(p => basket.products.has(p.id))
      )
    );
  }
}
