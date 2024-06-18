import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/server/db',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL ?? '',
  },
});
