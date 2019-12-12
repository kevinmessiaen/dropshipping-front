import { Component, OnInit } from "@angular/core";
import {
  RootStoreState,
  CategoriesAction,
  CategoriesSelectors
} from "src/app/root-store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Category } from "src/app/models/Category";
import {
  faStar as fasStar,
  faShoppingCart as fasShoppingCart,
  faSearch as fasSearch
} from "@fortawesome/free-solid-svg-icons";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { Basket } from "src/app/models/Basket";
import { BasketSelectors, BasketAction } from "src/app/root-store/basket-store";
import { CategoriesService } from "src/app/services/categories.service";
import { BasketService } from "src/app/services/basket.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  leafCategories$: Observable<Category[]>;
  basket$: Observable<Basket>;
  recherche: string = "";
  cartCount: number = 0;

  constructor(
    private categoriesService: CategoriesService,
    private basketService: BasketService,
    private library: FaIconLibrary
  ) {
    library.addIcons(fasStar, fasShoppingCart, fasSearch);
  }

  ngOnInit() {
    this.leafCategories$ = this.categoriesService.findLeafCategories();

    this.basketService.getUpdates().subscribe(b => {
      let c: number = 0;
      b.products.forEach((v, k) => {
        c += v;
      });
      this.cartCount = c;
    });

    this.categoriesService.load();
    this.basketService.create();
  }
}
