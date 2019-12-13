import { Component, OnInit, OnDestroy } from "@angular/core";
import { Basket } from "src/app/models/Basket";
import { BasketService } from "src/app/services/basket.service";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Socket } from "net";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"]
})
export class BasketComponent implements OnInit, OnDestroy {
  basket$: Observable<Basket>;
  basket: Basket;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.basket$ = this.basketService.getUpdates();

    this.subscription = this.basket$.subscribe(b => {
      this.basket = b;
    });
    this.basketService.create();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
