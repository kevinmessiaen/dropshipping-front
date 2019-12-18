import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {Category} from "../models/Category";
import {Observable} from "rxjs";
import {Product} from "../models/Product";
import {Basket, BasketDto, mapBasket, parseBasket} from "../models/Basket";
import {map} from "rxjs/operators";
import {User} from "../models/User";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    return this.http.post(`${environment.baseApiUrl}/login`, formData);
  }

  logout(): Observable<any> {
    return this.http.get(`${environment.baseApiUrl}/logout`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseApiUrl}/restricted/user`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseApiUrl}/categories`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApiUrl}/products`);
  }

  createBasket(): Observable<Basket> {
    return this.http
      .post<Basket>(`${environment.baseApiUrl}/basket`, {})
      .pipe(map(data => parseBasket(data)));
  }

  getBasket(basketId: string): Observable<Basket> {
    return this.http
      .get<Basket>(`${environment.baseApiUrl}/basket/${basketId}`)
      .pipe(map(data => parseBasket(data)));
  }

  updateBasket(basket: Basket): Observable<Basket> {
    return this.http
      .put<BasketDto>(
        `${environment.baseApiUrl}/basket/${basket.id}`,
        mapBasket(basket)
      )
      .pipe(map(data => parseBasket(data)));
  }
}
