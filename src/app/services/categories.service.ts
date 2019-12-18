import { Injectable, EventEmitter } from "@angular/core";
import { DataService } from "./data.service";
import {
  Category,
  CategoryTree,
  buildTree,
  findPath,
  findDeepChildren
} from "../models/Category";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  private _categories: Category[];
  private _categoryTree: CategoryTree[];
  categories$: EventEmitter<Category[]> = new EventEmitter();
  categoryTree$: EventEmitter<CategoryTree[]> = new EventEmitter();

  constructor(private dataService: DataService) {
    this.dataService.getCategories().subscribe(c => (this.categories = c));
  }

  set categories(categories: Category[]) {
    this._categories = categories;
    this.categories$.emit(this._categories);
    this.categoryTree = buildTree(this._categories);
  }

  set categoryTree(categoryTree: CategoryTree[]) {
    this._categoryTree = categoryTree;
    this.categoryTree$.emit(this._categoryTree);
  }

  findByPath(path: string): Observable<Category[]> {
    return this.categoryTree$.pipe(map(tree => findPath(path, tree)));
  }

  findDeepChildren(id: number): Observable<number[]> {
    return this.categoryTree$.pipe(
      map(tree => {
        return findDeepChildren(id, tree);
      })
    );
  }
}
