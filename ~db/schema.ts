import { sql } from 'drizzle-orm';
import {
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
  isPublished: boolean('is_published').notNull().default(true),
  isPaid: boolean('is_paid').notNull().default(true),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export const modules = pgTable('modules', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  courseId: uuid('course_id')
    .notNull()
    .references(() => courses.id),
  title: varchar('title', { length: 50 }).notNull(),
  summary: text('summary').default(''),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export const lessons = pgTable(
  'lessons',
  {
    id: serial('id').primaryKey(),
    moduleId: uuid('module_id')
      .notNull()
      .references(() => modules.id),
    title: varchar('title', { length: 50 }).notNull(),
    details: text('details').default(''),
    videoUrl: varchar('video_url', { length: 1024 }).default(''),
    isActive: boolean('is_active').default(true),
    isPaid: boolean('is_paid').default(true),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at').default(sql`now()`),
    updatedAt: timestamp('updated_at'),
  },
  // (table) => {
  //   return {
  //     courseModuleReference: foreignKey({
  //       columns: [table.courseId, table.moduleId],
  //       foreignColumns: [modules.courseId, modules.id],
  //     }),
  //     pk: primaryKey({ columns: [table.courseId, table.moduleId, table.id] }),
  //     parentReference: foreignKey({
  //       columns: [table.courseId, table.moduleId, table.nextLessonId],
  //       foreignColumns: [table.courseId, table.moduleId, table.id],
  //     }),
  //   };
  // },
);
