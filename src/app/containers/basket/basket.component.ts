import { Component, OnInit, OnDestroy } from "@angular/core";
import { Basket } from "src/app/models/Basket";
import { BasketService } from "src/app/services/basket.service";
import { Observable, Subscription, combineLatest } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/models/Product";
import { ProductsService } from "src/app/services/products.service";

import { isDefined } from "@angular/compiler/src/util";
import { map } from "rxjs/operators";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"]
})
export class BasketComponent implements OnInit {
  basket$: Observable<Basket>;
  products$: Observable<Map<Product, number>>;

  constructor(
    private basketService: BasketService,
    private productsSerive: ProductsService
  ) {}

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.products$ = combineLatest(
      this.productsSerive.getByUserBasket(),
      this.basketService.basket$.pipe()
    ).pipe(
      map(([products, basket]) => {
        let map: Map<Product, number> = new Map();
        basket.products.forEach((v, k) => {
          map.set(
            products.find(p => p.id === k),
            v
          );
        });
        return map;
      })
    );
  }
}
