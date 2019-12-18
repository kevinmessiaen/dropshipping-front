import {EventEmitter, Injectable} from "@angular/core";
import {isDefined} from "@angular/compiler/src/util";
import {DataService} from "./data.service";
import {Basket} from "../models/Basket";
import {BehaviorSubject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BasketService {
  private updateRequests$: EventEmitter<Basket> = new EventEmitter<Basket>();
  private _basketId: string;

  private _basket: Basket;
  basket$: BehaviorSubject<Basket> = new BehaviorSubject<Basket>({
    id: "",
    products: new Map<number, number>(),
    items: 0,
    price: 0
  });

  constructor(private dataService: DataService) {
    this.basketId = localStorage.getItem("basketId");
    if (!isDefined(this.basketId)) this.createBasket();

    this.updateRequests$.pipe(debounceTime(500))
      .subscribe((b) =>
        dataService.updateBasket(b).subscribe((updated) => this.basket = updated)
      );
  }

  set basketId(basketId: string) {
    if (this._basketId === basketId) return;
    this._basketId = basketId;

    console.log(basketId);
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

    console.log(this._basket);
    if (isDefined(this._basket)) {
      localStorage.setItem("basketId", this._basket.id);
      this.basketId = this._basket.id;
    } else {
      localStorage.removeItem("basketId");
    }
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

  addToBasket(product: number) {
    if (isDefined(this._basket)) {
      if (!isDefined(this._basket.products))
        this._basket.products = new Map<number, number>();
      if (this._basket.products.has(product))
        this._basket.products.set(product, this._basket.products.get(product) + 1);
      else this._basket.products.set(product, 1);
      this.updateRequests$.emit(this._basket);
    }
  }
}
