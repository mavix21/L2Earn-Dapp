import dotenv from 'dotenv';
dotenv.config();

// Drizzle example with the Neon serverless driver
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('No connection string provided');
}

const sql = neon(databaseUrl);

const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: '~db/migrations',
    });

    console.log('Migration successful');
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
};

main();
