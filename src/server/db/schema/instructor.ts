import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from '.';

const instructors = pgTable('instructors', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id)
    .unique(),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export const instructorRelations = relations(instructors, ({ one }) => ({
  user: one(users, {
    fields: [instructors.userId],
    references: [users.id],
  }),
}));

export default instructors;
