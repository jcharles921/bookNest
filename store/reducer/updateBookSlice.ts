import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../apis';

const initialState: UpdateBookState = {
  loading: false,
  error: false,
  success: false,
  message: '',
};

const updateBookSlice = createSlice({
  name: 'updateBook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.updateBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(api.updateBook.fulfilled, (state, action: PayloadAction<any>) => {
      
      state.loading = false;
      state.success = true;
      console.log("Book updated successfully");
      state.message = 'Book updated successfully';

    });
    builder.addCase(api.updateBook.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload || 'Error updating book';
      state.message = action.payload || 'Error updating book';
      state.success = false;
    });
    builder.addCase(api.resetAll, (state) => {
      state.error = false;
      state.message = '';
      state.success = false;


    });
  },
});

export default updateBookSlice.reducer;
