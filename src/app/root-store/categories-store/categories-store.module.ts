import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { categoriesReducer } from "./reducer";
import { EffectsModule } from "@ngrx/effects";
import { CategoriesEffects } from "./effects";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("categories", categoriesReducer),
    EffectsModule.forFeature([CategoriesEffects])
  ],
  providers: [CategoriesEffects]
})
export class CategoriesStoreModule {}
