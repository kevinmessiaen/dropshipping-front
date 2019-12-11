import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoriesComponent } from "./containers/categories/categories.component";
import { CategoryComponent } from "./containers/category/category.component";

const routes: Routes = [
  { path: "categories", component: CategoriesComponent },
  { path: "categorie/:path", component: CategoryComponent },
  { path: "page-introuvable", component: CategoriesComponent },
  { path: "**", redirectTo: "/page-introuvable", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
