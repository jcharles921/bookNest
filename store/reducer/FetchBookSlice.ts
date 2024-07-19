import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import api from '../apis'; 


const initialState: FetchBooksState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  data: [],
};

const fetchBooksSlice = createSlice({
  name: 'fetchBooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.fetchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(api.fetchBooks.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.message = 'Books fetched successfully';
      state.data = action.payload;
    });
    builder.addCase(api.fetchBooks.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload || 'Error fetching books';
      state.message = action.payload || 'Error fetching books';
      state.success = false;
    });
    builder.addCase(api.resetOnError, (state) => {
      state.error = false;
      state.message = '';
      state.success = false;
    });
    builder.addCase(api.resetAll, (state) => {
      state.error = false;
      state.message = '';
      state.success = false;
      state.data = [];
    });
  },
});

export default fetchBooksSlice.reducer;
