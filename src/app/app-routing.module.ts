import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from "./containers/category/category.component";
import { BasketComponent } from "./containers/basket/basket.component";
import { HomeComponent } from "./containers/home/home.component";
import { LoginComponent } from "./containers/login/login.component";
import { StoreComponent } from "./containers/store/store.component";
import { PageNotFoundComponent } from "./containers/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "store", component: StoreComponent },
  { path: "categorie/:path", component: CategoryComponent },
  { path: "basket", component: BasketComponent },
  { path: "page-introuvable", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/page-introuvable", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
