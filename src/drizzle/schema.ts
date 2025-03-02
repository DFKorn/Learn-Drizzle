import { integer, pgTable, varchar, uuid, pgEnum, uniqueIndex, unique, boolean, real, timestamp, primaryKey} from 'drizzle-orm/pg-core'

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
  
  export const PostTable = pgTable('post', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', {length: 255}).notNull(),
    averageRaiting: real('averageRaiting').notNull().default(0),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    authorId: uuid('authorId').references(() => usersTable.id).notNull()
  })

  export const CategoryTable = pgTable('category', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 255}).notNull(),
  })

  export const PostCategoryTable = pgTable('postCategory', {
    postId: uuid('postId').references(() => PostTable.id).notNull(),
    categoryId: uuid('categoryId').references(() => CategoryTable.id).notNull(),
  }, table => {
    return [
      primaryKey({columns: [table.postId, table.categoryId]})
    ]
  })