import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/models/Product";
import {
  ProductsSelectors,
  ProductsAction
} from "src/app/root-store/products-store";
import { Store, StoreRootModule } from "@ngrx/store";
import { RootStoreState } from "src/app/root-store";
import { ActivatedRoute, Router } from "@angular/router";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fasStar,
  faCartPlus as fasCartPlus
} from "@fortawesome/free-solid-svg-icons";
import { Basket } from "src/app/models/Basket";
import { BasketSelectors, BasketAction } from "src/app/root-store/basket-store";
import { isDefined } from "@angular/compiler/src/util";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  private _category: number;
  @Input() set category(category: number) {
    this._category = category;
    this.update();
  }

  products$: Observable<Product[]>;
  basket$: Observable<Basket>;
  basket: Basket;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    library: FaIconLibrary
  ) {
    library.addIcons(fasStar, farStar, fasCartPlus);
  }

  ngOnInit() {
    this.basket$ = this.store$.select(BasketSelectors.selectBasket);

    this.basket$.subscribe(b => {
      this.basket = b;
    });

    this.store$.dispatch(new ProductsAction.LoadRequestAction());
    this.store$.dispatch(new BasketAction.LoadRequestAction());
  }

  update() {
    this.products$ = this.store$.select(
      ProductsSelectors.selectAllProductsByCategoryId(this._category)
    );
  }

  addToBasket(product: number) {
    if (this.basket) {
      if (!this.basket.products) {
        this.basket.products = new Map();
      }
      if (this.basket.products.has(product)) {
        this.basket.products.set(
          product,
          this.basket.products.get(product) + 1
        );
      } else {
        this.basket.products.set(product, 1);
      }

      this.store$.dispatch(
        new BasketAction.UpdateRequestAction({
          basket: this.basket
        })
      );
    }
  }
}
