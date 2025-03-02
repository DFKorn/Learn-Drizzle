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

import { sql } from 'drizzle-orm'
import {db} from './drizzle/db'
import { usersTable } from './drizzle/schema'


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

async function main(){
   const users = await db.query.usersTable.findMany({
      columns: {email: true, name: true},
      //offset: 0
    })

    console.log(users)
  }

  

main()