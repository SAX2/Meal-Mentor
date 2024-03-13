import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from '../../../migrations/schema';

export const folders = pgTable('folders', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  title: text('title').notNull(),
  icon_id: text('icon_id').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  data: text('data'),
  folderOwner: uuid('folder_owner').notNull(),
});

export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  title: text('title').notNull(),
  icon_id: text('icon_id').notNull(),
  fileOwner: uuid('file_owner').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  data: text('data'),
  folderId: uuid('folder_id').notNull().references(() => folders.id, {
    onDelete: 'cascade',
  }),
});

export const collaborators = pgTable('collaborators', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  fileId: uuid('file_id')
    .notNull()
    .references(() => files.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});