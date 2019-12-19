import { Injectable } from "@angular/core";
import { CategoriesService } from "./categories.service";
import { Product } from "../models/Product";
import { DataService } from "./data.service";
import { BasketService } from "./basket.service";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";
import { isDefined } from "@angular/compiler/src/util";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private _products: Product[];
  products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(
    dataService: DataService,
    private categoriesService: CategoriesService,
    private basketService: BasketService
  ) {
    dataService.getProducts().subscribe(p => (this.products = p));
  }

  set products(products: Product[]) {
    this._products = products;
    this.products$.next(this._products);
  }

  getByCategoryId(id: number): Observable<Product[]> {
    return combineLatest([
      this.products$,
      this.categoriesService.findDeepChildren(id)
    ]).pipe(
      map(([products, ids]) => products.filter(p => ids.includes(p.categoryId)))
    );
  }

  getByUserBasket(): Observable<Product[]> {
    return combineLatest([
      this.products$.pipe(filter(p => isDefined(p) && p.length > 0)),
      this.basketService.basket$
    ]).pipe(
      map(([products, basket]) => {
        return products.filter(p => basket.products.has(p.id));
      })
    );
  }

  findByPath(path: string): Observable<Product> {
    return this.products$.pipe(
      map(products => products.find(p => p.path === path))
    );
  }
}
