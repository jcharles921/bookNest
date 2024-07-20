import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { books, preferences } from "@/db/schema";
import { eq } from "drizzle-orm";

const expoDb = openDatabaseSync("db.db");
const db = drizzle(expoDb);

class Api {
  resetAll = createAction("books/resetAll");
  resetOnError = createAction("books/resetOnError");

  addBook = createAsyncThunk(
    "books/addBook",
    async (book: Book, { rejectWithValue }) => {
      try {
        const bookWithValidDate = {
          ...book,
          createdAt: new Date(book.createdAt),
        };
        const response = await db.insert(books).values(bookWithValidDate);
        console.log(response + " Consoling response++++++++");
        return response;
      } catch (error: any) {
        console.log(error + " Consoling error");
        return rejectWithValue("Error adding book");
      }
    }
  );

  fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (_, { rejectWithValue }) => {
      try {
        const booksList = await db.select().from(books).all();
        const serializedBooksList = booksList.map((book) => ({
          ...book,
          createdAt: book.createdAt.toISOString(),
        }));
        return serializedBooksList;
      } catch (error: any) {
        return rejectWithValue("Error fetching books");
      }
    }
  );

  clearDatabase = createAsyncThunk(
    "books/clearDatabase",
    async (_, { rejectWithValue }) => {
      try {
        const response = await db.delete(books).all();
        console.log(response + " Consoling response for clearDatabase =======");
        return "Database cleared";
      } catch (error: any) {
        console.log(error + " Consoling error for clearDatabase =======");
        return rejectWithValue("Error clearing database");
      }
    }
  );

  updateBook = createAsyncThunk(
    "books/updateBook",
    async (
      { id, book }: { id: number; book: Partial<Book> },
      { rejectWithValue }
    ) => {
      try {
        const response = await db
          .update(books)
          .set(book)
          .where(eq(books.id, id))
          .run();
        return response;
      } catch (error: any) {
        return rejectWithValue("Error updating book");
      }
    }
  );

  deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (id: number, { rejectWithValue }) => {
      try {
        await db.delete(books).where(eq(books.id, id)).returning();
        return id;
      } catch (error: any) {
        return rejectWithValue("Error deleting book");
      }
    }
  );
  addPreference = createAsyncThunk(
    "preferences/addPreference",
    async (preference: Preference, { rejectWithValue }) => {
      try {
        const response = await db.insert(preferences).values(preference);
        console.log(response + " Consoling response++++++++");
        return response;
      } catch (error: any) {
        console.log(error + " Consoling error");
        return rejectWithValue("Error adding preference");
      }
    }
  );

  fetchPreferences = createAsyncThunk(
    "preferences/fetchPreferences",
    async (_, { rejectWithValue }) => {
      try {
        const preferencesList = await db.select().from(preferences).all();
        return preferencesList;
      } catch (error: any) {
        return rejectWithValue("Error fetching preferences");
      }
    }
  );

  updatePreference = createAsyncThunk(
    "preferences/updatePreference",
    async (
      { id, preference }: { id: number; preference: Partial<Preference> },
      { rejectWithValue }
    ) => {
      try {
        const response = await db
          .update(preferences)
          .set(preference)
          .where(eq(preferences.id, id))
          .run();
        return response;
      } catch (error: any) {
        return rejectWithValue("Error updating preference");
      }
    }
  );

  // deletePreference = createAsyncThunk(
  //   "preferences/deletePreference",
  //   async (id: number, { rejectWithValue }) => {
  //     try {
  //       await db.delete(preferences).where(eq(preferences.id, id)).returning();
  //       return id;
  //     } catch (error: any) {
  //       return rejectWithValue("Error deleting preference");
  //     }
  //   }
  // );
}

const api = new Api();
export default api;
