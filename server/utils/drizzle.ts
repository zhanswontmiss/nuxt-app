import { drizzle } from "drizzle-orm/libsql"
import * as schema from '../db/schema'

const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_TOKEN!,
  },
  schema
});

export function useDrizzle() {
    return db;
}

export type Fruit = typeof schema.fruitsTable.$inferSelect;