import { User } from "../../models/User";

export interface State {
  user: User | null;
  isLogged: boolean;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  user: null,
  isLogged: localStorage.getItem("isLogged") == "true",
  isLoading: false,
  error: null
};
