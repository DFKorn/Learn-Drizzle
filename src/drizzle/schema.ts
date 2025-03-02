import { integer, pgTable, varchar, uuid, pgEnum, index, uniqueIndex, unique, boolean} from 'drizzle-orm/pg-core'

export const UserRole = pgEnum('userRole',['ADMIN','BASIC'])


export const usersTable = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),  //integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name',{ length: 255 }).notNull(),
    age: integer('age').notNull(),
    email: varchar('email',{ length: 255 }).notNull(),
    role: UserRole('userRole').default('BASIC').notNull()
  }, table => {
    //  !!!! depricated !!!
    // return {
    //   emailIndex: uniqueIndex('emailIndex').on(table.email),
    //   uniqueNameAndAge: unique('uniqueNameAndAge').on(table.name, table.age)
    // }
    return [
      uniqueIndex('emailIndex').on(table.email),
      unique('uniqueNameAndAge').on(table.name, table.age)
    ]
  });

  export const UserPreferencesTable = pgTable('userPreferences', {
    id: uuid('id').primaryKey().defaultRandom(),
    emailUpdates: boolean('emailUpdates').notNull().default(false),
    userId: uuid('userId').references(() => usersTable.id).notNull(),
  })
  