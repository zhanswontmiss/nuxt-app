/// <reference types="node" />
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./server/db/schema.ts",
    dialect: "turso",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_TOKEN!,
    }
})