import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});