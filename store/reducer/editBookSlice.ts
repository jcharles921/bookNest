// editBookSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../apis';

interface EditBookState {
  bookToEdit: Book | null;
}

const initialState: EditBookState = {
  bookToEdit: null,
};

const editBookSlice = createSlice({
  name: 'editBook',
  initialState,
  reducers: {
    setBookToEdit: (state, action: PayloadAction<Book | null>) => {
      state.bookToEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(api.resetAll, (state) => {
      state.bookToEdit = null;
    });
  },
});

export const { setBookToEdit } = editBookSlice.actions;
export default editBookSlice.reducer;