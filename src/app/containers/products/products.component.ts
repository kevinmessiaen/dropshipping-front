import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
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
    private productsService: ProductsService,
    private basketService: BasketService,
    library: FaIconLibrary
  ) {
    library.addIcons(fasStar, farStar, fasCartPlus);
  }

  ngOnInit() {
    this.productsService.load();
    this.basketService.create();
  }

  update() {
    this.products$ = this.productsService.findByCategoryId(this._category);
  }

  addToBasket(product: number) {
    this.basketService.addToBasket(product);
  }
}
