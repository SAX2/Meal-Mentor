import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config()

if (!process.env.DATABASE_URL) console.log('🛑Cannot find Database')

export default {
  schema: './src/lib/supabase/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || ''
  }
} satisfies Config;