import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { courses } from '.';
import { lessons } from '.';

const modules = pgTable('modules', {
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

export const moduleRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, {
    fields: [modules.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export default modules;
