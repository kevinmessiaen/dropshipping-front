import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Product } from "src/app/models/Product";
import { ActivatedRoute, Router } from "@angular/router";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fasStar,
  faCartPlus as fasCartPlus
} from "@fortawesome/free-solid-svg-icons";
import { BasketSelectors, BasketAction } from "src/app/root-store/basket-store";
import { take } from "rxjs/operators";
import { ProductsService } from "src/app/services/products.service";
import { BasketService } from "src/app/services/basket.service";
import { CategoriesAction } from "src/app/root-store";
import { CategoriesService } from "src/app/services/categories.service";
import { isDefined } from "@angular/compiler/src/util";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _category: number;
  @Input() set category(category: number) {
    this._category = category;
    this.update();
  }

  products$: Observable<Product[]>;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private basketService: BasketService,
    library: FaIconLibrary
  ) {
    library.addIcons(fasStar, farStar, fasCartPlus);
  }

  ngOnInit() {
    this.categoriesService.load();
    this.productsService.load();
    this.basketService.create();
  }

  update() {
    if (isDefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.categoriesService
      .findChildrenIds(this._category)
      .subscribe(ids => {
        console.log(ids);
        this.products$ = this.productsService.findByCategoryIds(ids);
      });
  }

  addToBasket(product: number) {
    this.basketService.addToBasket(product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
