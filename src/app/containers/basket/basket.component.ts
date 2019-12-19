import { Component, OnInit, OnDestroy } from "@angular/core";
import { Basket } from "src/app/models/Basket";
import { BasketService } from "src/app/services/basket.service";
import { Observable, Subscription, combineLatest } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/models/Product";
import { ProductsService } from "src/app/services/products.service";

import { isDefined } from "@angular/compiler/src/util";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"]
})
export class BasketComponent implements OnInit {
  basket$: Observable<BasketWrapper>;

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
        console.log(map);
        return {
          products: map,
          items: basket.items,
          price: basket.price
        };
      })
    );
  }
}

class BasketWrapper {
  products: Map<Product, number>;
  items: number;
  price: number;
}
