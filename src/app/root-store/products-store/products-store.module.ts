import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { productsReducer } from "./reducer";
import { EffectsModule } from "@ngrx/effects";
import { ProductsEffects } from "./effects";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("products", productsReducer),
    EffectsModule.forFeature([ProductsEffects])
  ],
  providers: [ProductsEffects]
})
export class ProductsStoreModule {}
