import { configureStore } from "@reduxjs/toolkit";
import ThemeMode from "./reducer/ThemeMode";

export const store = configureStore({
  reducer: {
    ThemeMode: ThemeMode.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;