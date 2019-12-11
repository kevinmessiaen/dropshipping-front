import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Category } from "../models/Category";
import { Observable, of } from "rxjs";
import { Product } from "../models/Product";
import { Basket } from "../models/Basket";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseApiUrl}/categories`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApiUrl}/products`);
  }

  basket: Basket = {
    id: "test",
    products: new Map()
  };

  getBasket(basket: string): Observable<Basket> {
    return of(this.basket);
  }

  addToBasket(basket: string, product: number): Observable<Basket> {
    if (this.basket.products.has(product)) {
      this.basket.products.set(product, this.basket.products.get(product) + 1);
    } else {
      this.basket.products.set(product, 1);
    }
    return of(this.basket);
  }
}
