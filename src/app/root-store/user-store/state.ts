import {User} from "../../models/User";

export interface State {
  sessionId: string;
  user: User | null;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  sessionId: null,
  user: null,
  isLoading: false,
  error: null
};
