import { sql } from 'drizzle-orm';
import { foreignKey, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users as user } from '../../../migrations/schema';

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
  folderOwner: text('folder_owner').notNull(),
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
  folderId: text('folder_id').notNull().references(() => folders.id, {
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
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const users = pgTable("users", {
	id: text("id").primaryKey().notNull(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	avatarUrl: text("avatar_url"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	billingAddress: jsonb("billing_address"),
	paymentMethod: jsonb("payment_method"),
	email: text("email"),
},
// (table) => {
// 	return {
// 		usersIdFkey: foreignKey({
// 			columns: [table.id],
// 			foreignColumns: [table.id],
// 			name: "users_id_fkey"
// 		}),
//   }
//   }
);