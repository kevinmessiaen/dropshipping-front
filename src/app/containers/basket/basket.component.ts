import { Component, OnInit, OnDestroy } from "@angular/core";
import { BasketService } from "src/app/services/basket.service";
import { Observable, Subscription, combineLatest, of } from "rxjs";
import { Product } from "src/app/models/Product";
import { ProductsService } from "src/app/services/products.service";

import { map, filter, first } from "rxjs/operators";
import { ShippingMethod } from "src/app/models/ShippingMethod";
@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"]
})
export class BasketComponent implements OnInit {
  basket$: Observable<BasketWrapper>;

  shippingMethods$: Observable<ShippingMethod[]>;
  selectedDelivery: number = -1;
  delivery: ShippingMethod;

  constructor(
    private basketService: BasketService,
    private productsSerive: ProductsService
  ) {}

  ngOnInit() {
    this.basket$ = combineLatest(
      this.productsSerive.getByUserBasket(),
      this.basketService.basket$
    ).pipe(
      map(([products, basket]) => {
        let map: Map<Product, number> = new Map();
        basket.products.forEach((v, k) => {
          map.set(
            products.find(p => p.id === k),
            v
          );
        });
        map.delete(null);
        map.delete(undefined);
        return {
          products: map,
          items: basket.items,
          price: basket.price
        };
      })
    );
    this.shippingMethods$ = this.basketService.shippingMethods$;
  }

  async onSelectDelivery(newValue) {
    this.selectedDelivery = newValue;
    this.delivery = (
      await this.shippingMethods$.pipe(first()).toPromise()
    ).find(d => d.id == newValue);
  }
}

class BasketWrapper {
  products: Map<Product, number>;
  items: number;
  price: number;
}
