import { sql } from 'drizzle-orm';
import {
  boolean,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const difficulties = pgEnum('difficulty', [
  'beginner',
  'intermediate',
  'advanced',
]);

const courses = pgTable('courses', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: varchar('title', { length: 50 }).notNull(),
  headline: varchar('headline', { length: 256 }).default(''),
  description: text('description').default(''),
  price: numeric('price', { precision: 15, scale: 18 }).default(
    sql`0.0::numeric`,
  ),
  difficulty: difficulties('difficulty').default('beginner'),
  isPublished: boolean('is_published').notNull().default(true),
  isPaid: boolean('is_paid').notNull().default(true),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export default courses;
