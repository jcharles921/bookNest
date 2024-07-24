import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { faker } from "@faker-js/faker";
import { books } from "./schema";
import { sql } from "drizzle-orm";

const expoDb = openDatabaseSync("db.db");
const db = drizzle(expoDb);

function generateBookTitle() {
  const adjectives = [
    "Mysterious",
    "Enchanted",
    "Silent",
    "Hidden",
    "Forgotten",
    "Ancient",
    "Sacred",
    "Lost",
    "Haunted",
    "Golden",
    "Shadowy",
    "Eternal",
    "Majestic",
    "Radiant",
    "Vivid",
    "Serene",
    "Distant",
    "Enigmatic",
    "Secret",
    "Whispering",
  ];
  const nouns = [
    "Journey",
    "Legacy",
    "Secret",
    "Destiny",
    "Chronicles",
    "Quest",
    "Saga",
    "Tale",
    "Mystery",
    "Adventure",
    "Odyssey",
    "Epic",
    "Story",
    "Legend",
    "Fable",
    "Myth",
    "Voyage",
    "Expedition",
    "Discovery",
    "Pilgrimage",
  ];

  const adjective = faker.helpers.arrayElement(adjectives);
  const noun = faker.helpers.arrayElement(nouns);
  const subtitle = faker.lorem.words(3);

  return `${adjective} ${noun}: ${subtitle}`;
}

async function seedBooks() {
  // Check if the books table is empty
  try {
    const bookCountResult = await db
      .select({ count: sql`COUNT(*)` })
      .from(books)
      .execute();
    const bookCount = bookCountResult[0]?.count as number;

    if (bookCount > 0) {
      return;
    }
  } catch (error) {
    console.error("Error checking books table:", error);
    return;
  }

  // Generate new book entries
  const bookEntries = Array.from({ length: 20 }, () => ({
    name: generateBookTitle(),
    author: faker.person.fullName(),
    image: faker.image.url({ width: 116, height: 154 }),
    read: faker.datatype.boolean(),
    createdAt: sql`datetime('now')`,
    rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
  }));
  try {
    await db.insert(books).values(bookEntries);
    console.log("Books seeded successfully");
    return "Success";
    
  } catch (error) {
    console.error("Error seeding books:", error);
  }
}

export { seedBooks };
