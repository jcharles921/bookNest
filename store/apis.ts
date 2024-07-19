import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite/next';
import { books } from '@/db/schema'; // Adjust the path to your schema file

const expoDb = openDatabaseSync('db.db');
const db = drizzle(expoDb);



class Api {
  resetAll = createAction('books/resetAll');
  resetOnError = createAction('books/resetOnError');

addBook = createAsyncThunk(
    'books/addBook',
    async (book: Book, { rejectWithValue }) => {
        try {
            await db.insert(books).values({ ...book, createdAt: new Date(book.createdAt) });
            return book;
        } catch (error: any) {
            return rejectWithValue('Error adding book');
        }
    }
);

  fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (_, { rejectWithValue }) => {
      try {
        const booksList = await db.select().from(books).all();
        return booksList;
      } catch (error: any) {
        return rejectWithValue('Error fetching books');
      }
    }
  );
}

const api = new Api();
export default api;
