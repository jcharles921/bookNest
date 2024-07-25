import { configureStore } from "@reduxjs/toolkit";
import ThemeMode from "./reducer/ThemeMode";
import CreateBookSlice from "./reducer/CreateBookSlice";
import FetchBookSlice from "./reducer/FetchBookSlice";
import ClearDatabase from "./reducer/ClearDatabase";
import updateBook from "./reducer/updateBookSlice";
import addPreference from "./reducer/addPreference";
import updatePreference from "./reducer/updatePreference";
import fetchPreference from "./reducer/fetchPreference";
import getSingleBookSlice from "./reducer/getSingleBookSlice";
import editBookSlice from "./reducer/editBookSlice";
import deleteBookSlice from "./reducer/deleteBookSlice";

export const store = configureStore({
  reducer: {
    ThemeMode: ThemeMode.reducer,
    CreateBookSlice: CreateBookSlice,
    FetchBookSlice: FetchBookSlice,
    ClearDatabase: ClearDatabase,
    updateBook: updateBook,
    addPreference: addPreference,
    updatePreference: updatePreference,
    fetchPreference: fetchPreference,
    getSingleBookSlice: getSingleBookSlice,
    editBook: editBookSlice,
    deleteBookSlice: deleteBookSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
