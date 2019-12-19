import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Category } from "src/app/models/Category";
import {
  faStar as fasStar,
  faShoppingCart as fasShoppingCart,
  faSearch as fasSearch
} from "@fortawesome/free-solid-svg-icons";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { CategoriesService } from "src/app/services/categories.service";
import { BasketService } from "src/app/services/basket.service";
import { map } from "rxjs/operators";
import { isDefined } from "@angular/compiler/src/util";
import { Basket } from "src/app/models/Basket";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  leafCategories$: Observable<Category[]>;
  basket$: Observable<Basket>;

  constructor(
    private categoriesService: CategoriesService,
    private basketService: BasketService,
    private userService: UserService,
    library: FaIconLibrary
  ) {
    library.addIcons(fasStar, fasShoppingCart, fasSearch);
  }

  ngOnInit() {
    this.leafCategories$ = this.categoriesService.categories$.pipe(
      map(categories =>
        categories.filter(
          c => !isDefined(c.children) || c.children.length === 0
        )
      )
    );

    this.basket$ = this.basketService.basket$;
  }
}
