import { Component, OnInit, OnDestroy } from "@angular/core";
import { Basket } from "src/app/models/Basket";
import { BasketService } from "src/app/services/basket.service";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/models/Product";
import { ProductsService } from "src/app/services/products.service";
import { take } from "rxjs/operators";
import { keyframes } from "@angular/animations";
import { isDefined } from "@angular/compiler/src/util";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"]
})
export class BasketComponent implements OnInit, OnDestroy {
  basket$: Observable<Basket>;
  basket: Map<Product, number>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;
  subscription: Subscription;
  basketValue: number;

  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService,
    private productsSerive: ProductsService
  ) {}

  ngOnInit() {
    this.basket$ = this.basketService.getUpdates();

    this.subscription = this.basket$.subscribe(b => {
      this.productsSerive.findInBasket(b).subscribe(p => {
        let res: Map<Product, number> = new Map();
        b.products.forEach((v, k) =>
          res.set(
            p.find(p => p.id === k),
            v
          )
        );
        this.basket = res;

        let total: number = 0;

        res.forEach((v, k) => {
          if (isDefined(k)) {
            total += k.price * v;
          }
        });
        this.basketValue = total;
      });
    });

    this.error$ = this.productsSerive.error();
    this.isLoading$ = this.productsSerive.isLoading();

    this.basketService.create();
    this.productsSerive.load();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
