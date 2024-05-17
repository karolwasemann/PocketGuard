import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schema/*',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    // database: process.env.DATABASE_URL!,
    // user: 'PocketGuard_owner',
    // password: 'Xq5Kp0SEgler',
    // host: process.env.DATABASE_URL!,
  },
});
