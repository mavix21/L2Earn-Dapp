import dotenv from 'dotenv';
dotenv.config();

import { sql } from '@vercel/postgres';

// import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import { migrate } from 'drizzle-orm/vercel-postgres/migrator';

const databaseUrl = process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error('No connection string provided');
}

export const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'src/server/db/migrations',
    });

    console.log('Migration successful');
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
};

main();
