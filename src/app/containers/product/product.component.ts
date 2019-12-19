import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "src/app/services/products.service";
import { Observable } from "rxjs";
import { Product } from "src/app/models/Product";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  private product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.product$ = this.productsService.findByPath(params.path);
    });
  }
}
