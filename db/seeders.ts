import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { faker } from "@faker-js/faker";
import { books } from "./schema";
import { sql } from "drizzle-orm";

const expoDb = openDatabaseSync("db.db");
const db = drizzle(expoDb);

async function seedBooks() {
  // Clear the books table
  try {
    await db.delete(books);
    console.log("Books table cleared successfully");
  } catch (error) {
    console.error("Error clearing books table:", error);
    return;
  }

  // Generate new book entries
  const bookEntries = Array.from({ length: 10 }, () => ({
    name: faker.lorem.words(3),
    author: faker.person.fullName(),
    image: faker.image.url({ width: 116, height: 154 }),
    read: faker.datatype.boolean(),
    createdAt: sql`datetime('now')`, // Use SQL function for current timestamp
    rating: faker.number.int({ min: 1, max: 5 }),
  }));

  // Insert the new book entries
  try {
    await db.insert(books).values(bookEntries);
    console.log("Books seeded successfully");
  } catch (error) {
    console.error("Error seeding books:", error);
  }
}

export { seedBooks };