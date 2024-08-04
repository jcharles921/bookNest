import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { books } from "@/db/schema"; // Only keep books related imports
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { eq } from "drizzle-orm";

const expoDb = openDatabaseSync("db.db");
const db = drizzle(expoDb);

const PREFERENCE_KEY = "sorting";
const storePreference = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Error storing preference:", e);
  }
};

const getPreferences = async (): Promise<Preference | null> => {
  try {
    const value = await AsyncStorage.getItem(PREFERENCE_KEY);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error("Error fetching preferences:", e);
    return null;
  }
};

const setPreferences = async (preferences: Preference): Promise<void> => {
  try {
    await AsyncStorage.setItem(PREFERENCE_KEY, JSON.stringify(preferences));
  } catch (e) {
    console.error("Error storing preferences:", e);
  }
};


const removePreference = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing preference:", e);
  }
};

const getAllPreferences = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    return result.map(([key, value]) => ({ key, value }));
  } catch (e) {
    console.error("Error fetching all preferences:", e);
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
          createdAt: new Date(book.createdAt).toISOString(),
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
        }));

        return serializedBooksList;
      } catch (error: any) {
        console.log(error + " Consoling error");
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
        console.log(
          JSON.stringify(response, null, 2) +
            " Consoling response for updateBook ======="
        );
        return response;
      } catch (error: any) {
        return rejectWithValue("Error updating book");
      }
    }
  );
  getBook = createAsyncThunk(
    "books/getBook",
    async (id: number, { rejectWithValue }) => {
      try {
        const book = await db.select().from(books).where(eq(books.id, id));
        if (book) {
          return book;
        } else {
          return rejectWithValue("Book not found");
        }
      } catch (error: any) {
        console.log(error + " Consoling error");
        return rejectWithValue("Error fetching book");
      }
    }
  );

  deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (id: number, { rejectWithValue }) => {
      try {
        await db.delete(books).where(eq(books.id, id)).returning();
        console.log("Deleted");
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
        await setPreferences(preference);
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
        const preferences = await getPreferences();
        return preferences;
      } catch (error: any) {
        return rejectWithValue("Error fetching preferences");
      }
    }
  );

  updatePreference = createAsyncThunk(
    "preferences/updatePreference",
    async ({ preference }: { preference: Preference }, { rejectWithValue }) => {
      try {
        await storePreference("sorting", JSON.stringify(preference));
        return preference;
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
