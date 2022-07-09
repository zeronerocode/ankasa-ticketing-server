const { Pool } = require("pg");

// console.log("test");
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// const db = new Pool(pool);

// db.connect((err) => {
//   if (err) {
//     console.log("Failed to connect database...", err.message);
//     process.exit(1);
//   }
//   console.log("Successfully connect database...");
// });

module.exports = pool;
