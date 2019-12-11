import { Product } from "src/app/models/Product";
import { Basket } from "src/app/models/Basket";

export interface State {
  basket: Basket | null;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  basket: null,
  isLoading: false,
  error: null
};
