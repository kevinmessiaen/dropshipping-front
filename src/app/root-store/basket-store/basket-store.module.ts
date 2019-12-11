import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { basketReducer } from "./reducer";
import { EffectsModule } from "@ngrx/effects";
import { BasketEffects } from "./effects";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("baskets", basketReducer),
    EffectsModule.forFeature([BasketEffects])
  ],
  providers: [BasketEffects]
})
export class BasketStoreModule {}
