import { combineReducers } from "redux";
import drawer from "./controlDrawer";

export const rootReducer = combineReducers({
  drawer,
});

export type RootState = ReturnType<typeof rootReducer>;
