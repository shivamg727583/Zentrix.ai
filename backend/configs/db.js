import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(" DATABASE_URL is not defined");
}

const sql = neon(process.env.DATABASE_URL);

export default sql;

// This file sets up a connection to a PostgreSQL database using the Neon serverless client. The connection string is retrieved from the environment variable `DATABASE_URL`. The `sql` object can be used to execute queries against the database throughout the application.


////////////////////////////// CREATIONS TABLE SCHEMA //////////////////////////////
// CREATE TABLE creations (
//   id SERIAL PRIMARY KEY,
//   user_id TEXT NOT NULL,
//   prompt TEXT NOT NULL,
//   content TEXT NOT NULL,
//   type TEXT NOT NULL,
//   publish BOOLEAN DEFAULT FALSE,
//   likes TEXT[] DEFAULT '{}',
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );