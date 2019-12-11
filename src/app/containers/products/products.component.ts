import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/models/Product";
import {
  ProductsSelectors,
  ProductsAction
} from "src/app/root-store/products-store";
import { Store } from "@ngrx/store";
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>,
    library: FaIconLibrary
  ) {
    library.addIcons(fasStar, farStar, fasCartPlus);
  }

  ngOnInit() {
    this.store$.dispatch(new ProductsAction.LoadRequestAction());
  }

  update() {
    this.products$ = this.store$.select(
      ProductsSelectors.selectAllProductsByCategoryId(this._category)
    );
  }

  addToBasket(product: number) {
    this.store$.dispatch(
      new BasketAction.AddRequestAction({
        basket: "test",
        product: product
      })
    );
  }
}
