import { Component, OnInit } from "@angular/core";
import { BasketService } from "src/app/services/basket.service";
import { Observable, combineLatest } from "rxjs";
import { Product } from "src/app/models/Product";
import { ProductsService } from "src/app/services/products.service";
import {
  faPaypal as fabPaypal,
  faCcMastercard as fabCcMastercard,
  faCcVisa as fabCcVisa
} from "@fortawesome/free-brands-svg-icons";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { map, first } from "rxjs/operators";
import { ShippingMethod } from "src/app/models/ShippingMethod";
@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"]
})
export class BasketComponent implements OnInit {
  basket$: Observable<BasketWrapper>;

  validate: boolean = false;

  shippingMethods$: Observable<ShippingMethod[]>;
  selectedDelivery: number = -1;
  delivery: ShippingMethod;

  constructor(
    private basketService: BasketService,
    private productsService: ProductsService,
    library: FaIconLibrary
  ) {
    library.addIcons(fabPaypal, fabCcMastercard, fabCcVisa);
  }

  ngOnInit() {
    this.basket$ = combineLatest(
      [this.productsService.getByUserBasket(),
      this.basketService.basket$]
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

  createOrder() {
    this.validate = true;
  }

  deleteProduct(id: number) {

  }

  selectQuantity(id: number) {

  }
}

class BasketWrapper {
  products: Map<Product, number>;
  items: number;
  price: number;
}
