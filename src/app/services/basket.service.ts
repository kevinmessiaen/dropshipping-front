import { EventEmitter, Injectable } from "@angular/core";
import { isDefined } from "@angular/compiler/src/util";
import { DataService } from "./data.service";
import { Basket } from "../models/Basket";
import { BehaviorSubject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ShippingMethod } from "../models/ShippingMethod";

@Injectable({
  providedIn: "root"
})
export class BasketService {
  private updateRequests$: EventEmitter<Basket> = new EventEmitter<Basket>();
  private _basketId: string;

  private _basket: Basket;
  basket$: BehaviorSubject<Basket> = new BehaviorSubject<Basket>({
    id: null,
    products: new Map<number, number>(),
    items: 0,
    price: 0
  });

  private _shippingMethods: ShippingMethod[];
  shippingMethods$: BehaviorSubject<ShippingMethod[]> = new BehaviorSubject<
    ShippingMethod[]
  >([]);

  constructor(private dataService: DataService) {
    this.basketId = localStorage.getItem("basketId");
    if (!isDefined(this._basketId)) this.createBasket();

    this.updateRequests$
      .pipe(debounceTime(500))
      .subscribe(b =>
        dataService
          .updateBasket(b)
          .subscribe(updated => (this.basket = updated))
      );
  }

  set basketId(basketId: string) {
    if (this._basketId === basketId) return;
    this._basketId = basketId;

    if (isDefined(this._basketId)) {
      this.getBasket();
    } else {
      this.createBasket();
    }
  }

  set basket(basket: Basket) {
    if (this._basket === basket) return;
    this._basket = basket;
    this.basket$.next(this._basket);

    if (isDefined(this._basket)) {
      localStorage.setItem("basketId", this._basket.id);
      if (this._basketId !== this._basket.id) this.basketId = this._basket.id;
      this.getShippingMethods();
    } else {
      localStorage.removeItem("basketId");
    }
  }

  set shippingMethods(shippingMethods: ShippingMethod[]) {
    if (this._shippingMethods === shippingMethods) return;
    this._shippingMethods = shippingMethods;
    this.shippingMethods$.next(this._shippingMethods);
  }

  createBasket() {
    this.dataService.createBasket().subscribe(
      basket => (this.basket = basket),
      error => (this.basket = null)
    );
  }

  getBasket() {
    this.dataService.getBasket(this._basketId).subscribe(
      basket => (this.basket = basket),
      error => (this.basket = null)
    );
  }

  getShippingMethods() {
    this.dataService.getShippingMethods(this._basketId).subscribe(
      shippingMethods => (this.shippingMethods = shippingMethods),
      error => (this.shippingMethods = null)
    );
  }

  addToBasket(product: number, quantity: number) {
    if (isDefined(this._basket)) {
      if (!isDefined(this._basket.products))
        this._basket.products = new Map<number, number>();
      if (this._basket.products.has(product))
        this._basket.products.set(
          product,
          this._basket.products.get(product) + quantity
        );
      else this._basket.products.set(product, quantity);
      this.updateRequests$.emit(this._basket);
    }
  }

  removeProduct(product: number) {
    if (isDefined(this._basket)) {
      if (!isDefined(this._basket.products))
        this._basket.products = new Map<number, number>();
      this._basket.products.delete(product);
      this.updateRequests$.emit(this._basket);
    }
  }

  setProduct(product: number, quantity: number) {
    if (isDefined(this._basket)) {
      if (!isDefined(this._basket.products))
        this._basket.products = new Map<number, number>();
      this._basket.products.set(product, quantity);
      this.updateRequests$.emit(this._basket);
    }
  }

}
