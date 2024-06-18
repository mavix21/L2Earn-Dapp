import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { default as courses } from './course';
import { default as users } from './user';

import { sql } from 'drizzle-orm';

const enrolment = pgTable(
  'enrolments',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id),
    enrolmentDate: timestamp('enrolment_date').default(sql`now()`),
    completionDate: timestamp('completion_date'),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.courseId] }),
  }),
);

export default enrolment;
