import {neon} from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

export default sql;

// This file sets up a connection to a PostgreSQL database using the Neon serverless client. The connection string is retrieved from the environment variable `DATABASE_URL`. The `sql` object can be used to execute queries against the database throughout the application.
