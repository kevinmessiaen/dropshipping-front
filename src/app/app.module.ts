import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RootStoreModule } from "./root-store/root-store.module";
import { CategoriesComponent } from "./containers/categories/categories.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NavbarComponent } from "./containers/navbar/navbar.component";
import { CategoryComponent } from "./containers/category/category.component";
import { ProductsComponent } from './containers/products/products.component';
import { BasketComponent } from './containers/basket/basket.component';
import { HomeComponent } from './containers/home/home.component';
import { LoginComponent } from './containers/login/login.component';
import { InscriptionComponent } from './containers/inscription/inscription.component';
import { StoreComponent } from './containers/store/store.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    NavbarComponent,
    CategoryComponent,
    ProductsComponent,
    BasketComponent,
    HomeComponent,
    LoginComponent,
    InscriptionComponent,
    StoreComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RootStoreModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
