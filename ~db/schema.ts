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
  headline: varchar('headline', { length: 256 }).notNull(),
  description: text('description').notNull(),
  price: numeric('price', { precision: 15, scale: 18 }).notNull(),
  difficulty: difficulties('difficulty').default('beginner'),
  isPublished: boolean('isPublished').default(false),
  isPaid: boolean('is_paid').default(true),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`now()`),
});

export const modules = pgTable('modules', {
  id: serial('id').primaryKey(),
  courseId: integer('id')
    .notNull()
    .references(() => courses.id),
  title: varchar('title', { length: 50 }).notNull(),
  summary: text('summary').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('createdAt').default(sql`now()`),
});

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  moduleId: integer('module_id')
    .notNull()
    .references(() => modules.id),
  title: varchar('title', { length: 50 }).notNull(),
  videoUrl: varchar('video_url', { length: 256 }).notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('createdAt').default(sql`now()`),
  isPaid: boolean('is_paid').default(true),
  nextLessonId: integer('next_lesson_id').references(
    (): AnyPgColumn => lessons.id,
  ),
});
