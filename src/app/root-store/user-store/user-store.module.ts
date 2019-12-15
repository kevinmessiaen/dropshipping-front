import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "./effects";
import {userReducer} from "./reducer";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("user", userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [UserEffects]
})
export class UserStoreModule {}
