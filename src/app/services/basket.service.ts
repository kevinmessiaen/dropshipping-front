import { EventEmitter, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootStoreState } from "../root-store";
import { BasketAction, BasketSelectors } from "../root-store/basket-store";
import { Basket } from "../models/Basket";
import { debounceTime, take, first } from "rxjs/operators";
import { isDefined } from "@angular/compiler/src/util";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BasketService {
  private shouldCreateOrLoad: boolean = true;
  private updateRequested: boolean = false;
  private basket$: EventEmitter<Basket> = new EventEmitter();
  private basket: Basket;
  private products: Map<number, number> = null;

  constructor(private store$: Store<RootStoreState.State>) {
    this.basket$.pipe(debounceTime(500)).subscribe(b => {
      if (this.updateRequested) {
        this.updateRequested = false;
        this.store$.dispatch(
          new BasketAction.UpdateRequestAction({
            basket: b
          })
        );
      }
    });
  }

  create() {
    if (this.shouldCreateOrLoad) {
      let basketId = localStorage.getItem("basketId");

      if (isDefined(basketId)) {
        this.store$.select(BasketSelectors.selectBasketsError).subscribe(e => {
          if (e) {
            console.log(e);
            localStorage.removeItem("basketId");
            this.create();
          }
        });
      }
      this.store$
        .select(BasketSelectors.selectBasket)
        .pipe(first(b => isDefined(b)))
        .subscribe((b: Basket) => {
          if (b != null && this.products == null) {
            if (!b.products) {
              b.products = new Map();
            }
            this.basket = b;
            localStorage.setItem("basketId", this.basket.id);
            this.basket$.emit(b);
          }
        });
      this.shouldCreateOrLoad = false;

      if (isDefined(basketId)) {
        this.store$.dispatch(
          new BasketAction.LoadRequestAction({
            basketId
          })
        );
      } else {
        this.store$.dispatch(new BasketAction.CreateRequestAction());
      }
    } else if (this.basket) {
      this.basket$.emit(this.basket);
    }
  }

  recreate() {
    localStorage.removeItem("basketId");
    this.shouldCreateOrLoad = true;
    this.create();
  }

  async addToBasket(productId: number) {
    let basket = this.basket
      ? this.basket
      : await this.basket$
          .pipe(take(1))
          .toPromise()
          .then(b => b);
    if (basket.products.has(productId)) {
      basket.products.set(productId, basket.products.get(productId) + 1);
    } else {
      basket.products.set(productId, 1);
    }
    this.updateRequested = true;
    this.basket$.emit(basket);
  }

  getUpdates(): EventEmitter<Basket> {
    return this.basket$;
  }
}
