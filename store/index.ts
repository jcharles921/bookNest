import { configureStore } from "@reduxjs/toolkit";
import ThemeMode from "./reducer/ThemeMode";
import CreateBookSlice from "./reducer/CreateBookSlice";
import FetchBookSlice from "./reducer/FetchBookSlice";

export const store = configureStore({
  reducer: {
    ThemeMode: ThemeMode.reducer,
    CreateBookSlice: CreateBookSlice,
    FetchBookSlice: FetchBookSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
