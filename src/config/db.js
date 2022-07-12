const { Pool } = require("pg");

// console.log("test");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
  }
});

// const db = new Pool(pool);

pool.connect((err) => {
  if (err) {
    console.log("Database not connected");
  } else {
    console.log(`Database connected on ${process.env.DB_NAME}`);
  }
});

module.exports = pool;
