// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

import { asc, count, desc, eq, gt, sql } from 'drizzle-orm'
import {db} from './drizzle/db'
import { UserPreferencesTable, usersTable } from './drizzle/schema'


// ------ Insert Test ----------
/* async function main(){
//   await db.delete(usersTable)

//   const user = await db.insert(usersTable).values([{
//     name: "Dmitry",
//     age: 32,
//     email:'test@testmail.com'
//   }, {name: 'Sally', age:25, email: 'test@test2.com'}
// ]).returning({
//     id: usersTable.id,
//     userName: usersTable.name
//   }).onConflictDoUpdate({
//     target: usersTable.email,
//     set: {name: 'Updated Name'}
//   })

//   console.log(user)

  // const user = await db.query.usersTable.findFirst()
  // 
  //await db.delete(usersTable)
} */


  // -------- Select Queries test -------------
  /* async function main(){
   const users = await db.query.usersTable.findMany({
      columns: {email: true, name: true},
      extras: {lowerCaseName: sql<string>`lower(${usersTable.name})`.as('lowerCaseName')}
    })

    console.log(users)
  } */


// --------- Query Style Data selection ----------------    
// async function main(){
//   // await db.insert(UserPreferencesTable).values({
//   //   emailUpdates: true,
//   //   userId: '67ae394e-0b5f-4622-bac7-295173c09a02'
//   // })
//    const users = await db.query.usersTable.findMany({
//       columns: {age: true, id: true, name: true},

//       // ---- "with" examples -----
//       //with: {preferences: true}

//       // with: {
//       //   posts: {with: {postCategories: true}}
//       // }

//       // with: {preferences: {
//       //   columns: {
//       //     emailUpdates: true
//       //   }
//       // }}

//       //----- "oderBy" object examples ----
//       //orderBy: desc(usersTable.age)
//       //orderBy: asc(usersTable.age)

//       //----- "orderBy" function examples ----
//       orderBy: (table, funcs) => funcs.asc(table.age),
//       // orderBy: (table, {asc}) => asc(table.age) // more concise 


//       //----- "where" function examples ----

//       //where: (table, funcs) => funcs.eq(table.age, 25)
//       where: (table, funcs) => funcs.between(table.age, 20, 29)


//       //offset: 0
//     })

//     console.log(users)
//   }

// --------- SQL Style Data selection ----------------
async function main(){
  // await db.insert(UserPreferencesTable).values({
  //   emailUpdates: true,
  //   userId: '67ae394e-0b5f-4622-bac7-295173c09a02'
  // })


   /* const users = await db
    .select({
      id: usersTable.id, 
      age: usersTable.age,
      emailUpdates: UserPreferencesTable.emailUpdates
    })
    .from(usersTable)
    .where(eq(usersTable.age, 25))
    .leftJoin(UserPreferencesTable, eq(UserPreferencesTable.userId, usersTable.id))
 */


    // ---- groupBy selection -----
    const users = await db
    .select({
      name: usersTable.name,
      count: count(usersTable.name),
    })
    .from(usersTable)
    .groupBy(usersTable.name)
    .having(columns => gt(columns.count, 0))



    console.log(users)
  }



  

main()