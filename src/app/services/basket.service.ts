import { Injectable, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootStoreState } from "../root-store";
import { BasketAction, BasketSelectors } from "../root-store/basket-store";
import { Basket } from "../models/Basket";
import { debounceTime, take } from "rxjs/operators";

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
      let subscription = this.store$
        .select(BasketSelectors.selectBasket)
        .pipe()
        .subscribe((b: Basket) => {
          if (b != null && this.products == null) {
            if (!b.products) {
              b.products = new Map();
            }
            this.basket = b;
            this.basket$.emit(b);
            subscription.unsubscribe();
          }
        });
      this.shouldCreateOrLoad = false;
      this.store$.dispatch(new BasketAction.LoadRequestAction());
    }
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
