import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {buildTree, Category, CategoryTree, findDeepChildren, findPath} from "../models/Category";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  private _categories: Category[];
  private _categoryTree: CategoryTree[];
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  categoryTree$: BehaviorSubject<CategoryTree[]> = new BehaviorSubject<CategoryTree[]>([]);

  constructor(private dataService: DataService) {
    this.dataService.getCategories().subscribe(c => (this.categories = c));
  }

  set categories(categories: Category[]) {
    this._categories = categories;
    this.categories$.next(this._categories);
    this.categoryTree = buildTree(this._categories);
  }

  set categoryTree(categoryTree: CategoryTree[]) {
    this._categoryTree = categoryTree;
    this.categoryTree$.next(this._categoryTree);
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
