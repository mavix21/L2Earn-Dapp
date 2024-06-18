import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { modules } from './index';

const lessons = pgTable(
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

export const lessonRelations = relations(lessons, ({ one }) => ({
  module: one(modules, {
    fields: [lessons.moduleId],
    references: [modules.id],
  }),
}));

export default lessons;
