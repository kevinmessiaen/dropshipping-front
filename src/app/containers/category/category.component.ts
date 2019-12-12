import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "src/app/models/Category";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesService } from "src/app/services/categories.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  categoryPath$: Observable<Category[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryPath$ = this.categoriesService.findByPath(params.path);
    });

    this.error$ = this.categoriesService.error();
    this.isLoading$ = this.categoriesService.isLoading();
    this.categoriesService.load();
  }
}
