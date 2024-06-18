import { pgTable, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { relations, sql } from 'drizzle-orm';
import { users } from '.';

const students = pgTable(
  'students',
  {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id)
      .unique(),
    createdAt: timestamp('created_at').default(sql`now()`),
    updatedAt: timestamp('updated_at'),
  },
  (table) => ({
    userIdx: uniqueIndex('user_id_idx').on(table.userId),
  }),
);

export const studentsRelations = relations(students, ({ one }) => ({
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
}));

export default students;
