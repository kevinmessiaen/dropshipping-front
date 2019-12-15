import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesStoreModule } from "./categories-store/categories-store.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ProductsStoreModule } from "./products-store";
import { BasketStoreModule } from "./basket-store";
import {UserStoreModule} from "./user-store";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriesStoreModule,
    ProductsStoreModule,
    BasketStoreModule,
    UserStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule {}
