import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {Category} from "../models/Category";
import {Observable} from "rxjs";
import {Product} from "../models/Product";
import {Basket, BasketDto} from "../models/Basket";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseApiUrl}/categories`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApiUrl}/products`);
  }

  createBasket(): Observable<Basket> {
    return this.http.post<Basket>(`${environment.baseApiUrl}/basket`, {});
  }

  getBasket(basketId: string): Observable<Basket> {
    return this.http.get<Basket>(`${environment.baseApiUrl}/basket/${basketId}`, {})
      .pipe(map(data => {
          let retour: Basket = {
            id: data.id,
            products: new Map()
          };

          Object.entries(data.products).forEach(k => {
            retour.products.set(parseInt(k[0]), k[1]);
          });
          return retour;
        })
      );
  }

  updateBasket(basket: Basket): Observable<Basket> {
    let products = {};
    if (basket.products) {
      basket.products.forEach((v, k) => (products[k] = v));
    }
    let data = {
      id: basket.id,
      products: products
    };
    return this.http
      .put<BasketDto>(`${environment.baseApiUrl}/basket/${basket.id}`, data)
      .pipe(
        map(data => {
          let retour: Basket = {
            id: data.id,
            products: new Map()
          };

          Object.entries(data.products).forEach(k => {
            retour.products.set(parseInt(k[0]), k[1]);
          });
          return retour;
        })
      );
  }
}
