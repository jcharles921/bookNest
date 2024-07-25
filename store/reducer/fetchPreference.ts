import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../apis";

const initialState: FetchPreferencesState = {
  loading: false,
  error: false,
  success: false,
  message: "",
  data: {
    id: 1,
    sortingOrder: "Date",
    preferredTheme: "dark",
  } as Preference,
};

const fetchPreferencesSlice = createSlice({
  name: "fetchPreferences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.fetchPreferences.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      api.fetchPreferences.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = "Preferences fetched successfully";
        state.data = action.payload;
      }
    );
    builder.addCase(
      api.fetchPreferences.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Error fetching preferences";
        state.message = action.payload || "Error fetching preferences";
        state.success = false;
      }
      
    );
  },
});

export default fetchPreferencesSlice.reducer;
