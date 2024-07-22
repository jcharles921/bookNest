import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

const expoDb = openDatabaseSync("db.db");
const db = drizzle(expoDb);