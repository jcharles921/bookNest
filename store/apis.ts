import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { books } from "@/db/schema"; // Only keep books related imports
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { eq } from "drizzle-orm";

const expoDb = openDatabaseSync("db.db");
const db = drizzle(expoDb);

const storePreference = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error storing preference:', e);
  }
};

const getPreference = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error('Error fetching preference:', e);
  }
};

const removePreference = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing preference:', e);
  }
};

const getAllPreferences = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    return result.map(([key, value]) => ({ key, value }));
  } catch (e) {
    console.error('Error fetching all preferences:', e);
  }
};

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

  // Preferences AsyncStorage Operations
  addPreference = createAsyncThunk(
    "preferences/addPreference",
    async (preference: Preference, { rejectWithValue }) => {
      try {
        await storePreference(preference.id.toString(), JSON.stringify(preference));
        return preference;
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
        const preferencesList = await getAllPreferences();
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
        const existingPreference = await getPreference(id.toString());
        if (existingPreference) {
          const updatedPreference = { ...JSON.parse(existingPreference), ...preference };
          await storePreference(id.toString(), JSON.stringify(updatedPreference));
          return updatedPreference;
        } else {
          return rejectWithValue("Preference not found");
        }
      } catch (error: any) {
        return rejectWithValue("Error updating preference");
      }
    }
  );

  deletePreference = createAsyncThunk(
    "preferences/deletePreference",
    async (id: number, { rejectWithValue }) => {
      try {
        await removePreference(id.toString());
        return id;
      } catch (error: any) {
        return rejectWithValue("Error deleting preference");
      }
    }
  );
}

const api = new Api();
export default api;
