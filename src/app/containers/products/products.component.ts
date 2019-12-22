import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/models/Product";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fasStar,
  faCartPlus as fasCartPlus
} from "@fortawesome/free-solid-svg-icons";
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
    private productsService: ProductsService,
    private basketService: BasketService,
    library: FaIconLibrary
  ) {
    library.addIcons(fasStar, farStar, fasCartPlus);
  }

  ngOnInit() {}

  update() {
    this.products$ = this.productsService.getByCategoryId(this._category);
  }

  addToBasket(product: number) {
    this.basketService.addToBasket(product, 1);
  }
}
