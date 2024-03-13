import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import * as schema from '../../../migrations/schema'
import { migrate } from 'drizzle-orm/postgres-js/migrator';
dotenv.config({ path: '.env' })

if (!process.env.DATABASE_URL) console.log('🛑Cannot find Database')

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(process.env.DATABASE_URL as string, { max: 1 })
const db = drizzle(client, { schema });

// const migrateDb = async () => {
//   console.log('⏩Migrating Client')
//   try {
//     await migrate(db, { migrationsFolder: 'migrations' })
//     console.log('✅Successfully Migrated')
//   } catch (error) {
//     console.log('🛑Error while migrating client', error)
//   }
// }
// migrateDb();

export default db;