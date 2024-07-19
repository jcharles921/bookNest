import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import api from '../apis';


const initialState: CreateBookState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  data: {},
};

const createBookSlice = createSlice({
  name: 'createBook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.addBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(api.addBook.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.message = 'Book added successfully';
      state.data = action.payload;
    });
    builder.addCase(api.addBook.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload || 'Error adding book';
      state.message = action.payload || 'Error adding book';
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
      state.data = {};
    });
  },
});

export default createBookSlice.reducer;
