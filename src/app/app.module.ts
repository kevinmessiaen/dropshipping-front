import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NavbarComponent } from "./containers/navbar/navbar.component";
import { CategoryComponent } from "./containers/category/category.component";
import { ProductsComponent } from "./containers/products/products.component";
import { BasketComponent } from "./containers/basket/basket.component";
import { HomeComponent } from "./containers/home/home.component";
import { LoginComponent } from "./containers/login/login.component";
import { RegisterComponent } from "./containers/register/register.component";
import { StoreComponent } from "./containers/store/store.component";
import { PageNotFoundComponent } from "./containers/page-not-found/page-not-found.component";
import { BasicAuthInterceptor } from "./basic-auth.interceptor";
import { AdminModule } from "./admin/admin.module";
import { ProductComponent } from "./containers/product/product.component";
import { ContactFormComponent } from './containers/contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryComponent,
    ProductsComponent,
    BasketComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    StoreComponent,
    PageNotFoundComponent,
    ProductComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
