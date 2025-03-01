import { integer, pgTable, varchar, uuid} from 'drizzle-orm/pg-core'


export const usersTable = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),  //integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name',{ length: 255 }).notNull(),
    // age: integer().notNull(),
    // email: varchar({ length: 255 }).notNull().unique(),
  });