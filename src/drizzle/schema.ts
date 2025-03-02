import { relations } from 'drizzle-orm';
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


// RELATIONS  (Drizzle level references)

export const usersTableRelations = relations(usersTable, ({one, many}) => {
  return {
    preferences: one(UserPreferencesTable),
    post: many(PostTable)
  }
})

export const UserPreferencesTableRelations = relations(UserPreferencesTable, ({one}) => {
  return {
    user: one(usersTable, {
      fields: [UserPreferencesTable.userId],
      references: [usersTable.id]
    })
  }
})

export const PostTableRelations = relations(PostTable, ({one, many}) => {
  return {
    author: one(usersTable, {
      fields: [PostTable.authorId],
      references: [usersTable.id]
    }),
    postCategories: many(PostCategoryTable)
  }
})

export const CategoryTableRelations = relations(CategoryTable, ({many}) => {
  return {
    postCategories: many(PostCategoryTable),
  }
})

export const PostCategoryTableRelations = relations(PostCategoryTable, ({one}) => {
  return {
    post: one(PostTable, {
      fields: [PostCategoryTable.postId],
      references: [PostTable.id]
    }),
    category: one(CategoryTable, {
      fields: [PostCategoryTable.categoryId],
      references: [CategoryTable.id]
    })
  }
})
