import { EventEmitter, Injectable } from "@angular/core";
import { isDefined } from "@angular/compiler/src/util";
import { DataService } from "./data.service";
import { Basket } from "../models/Basket";

@Injectable({
  providedIn: "root"
})
export class BasketService {
  private _basketId: string;

  private _basket: Basket;
  basket$: EventEmitter<Basket> = new EventEmitter();

  constructor(private dataService: DataService) {
    this.basketId = localStorage.getItem("basketId");
    if (!isDefined(this.basketId)) this.createBasket();
  }

  set basketId(basketId: string) {
    if (this._basketId === basketId) return;

    if (isDefined(basketId)) {
      this.getBasket();
    } else {
      this.createBasket();
    }
  }

  set basket(basket: Basket) {
    if (this._basket === basket) return;
    this.basket$.emit(this._basket);

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
    this.basket$.subscribe(b => {
      console.log(b);
      this.basket$.emit(b);
    });
  }
}
