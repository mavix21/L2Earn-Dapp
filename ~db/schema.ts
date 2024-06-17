import { sql } from 'drizzle-orm';
import {
  AnyPgColumn,
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
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

export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: varchar('title', { length: 50 }).notNull(),
  headline: varchar('headline', { length: 256 }).default(''),
  description: text('description').default(''),
  price: numeric('price', { precision: 15, scale: 18 }).default(
    sql`0.0::numeric`,
  ),
  difficulty: difficulties('difficulty').default('beginner'),
  isPublished: boolean('isPublished').default(false),
  isPaid: boolean('is_paid').default(true),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export const modules = pgTable('modules', {
  id: serial('id').primaryKey(),
  courseId: integer('id')
    .notNull()
    .references(() => courses.id),
  title: varchar('title', { length: 50 }).notNull(),
  summary: text('summary').default(''),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('createdAt').default(sql`now()`),
  updatedAt: timestamp('updatedAt'),
});

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  moduleId: integer('module_id')
    .notNull()
    .references(() => modules.id),
  title: varchar('title', { length: 50 }).notNull(),
  videoUrl: varchar('video_url', { length: 256 }).default(''),
  isActive: boolean('is_active').default(true),
  isPaid: boolean('is_paid').default(true),
  createdAt: timestamp('createdAt').default(sql`now()`),
  updatedAt: timestamp('updatedAt'),
  nextLessonId: integer('next_lesson_id').references(
    (): AnyPgColumn => lessons.id,
  ),
});
