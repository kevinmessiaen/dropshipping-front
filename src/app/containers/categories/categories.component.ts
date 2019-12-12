import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "src/app/models/Category";
import { CategoriesService } from "src/app/services/categories.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.findAll();
    this.error$ = this.categoriesService.error();
    this.isLoading$ = this.categoriesService.isLoading();
    this.categoriesService.load();
  }
}
