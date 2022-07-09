<<<<<<< HEAD
require("dotenv").config();
const {Pool} = require('pg')
=======
const { Pool } = require("pg");

// console.log("test");
>>>>>>> f7963a169d1bb6eeafdaf8151a988d3b61977528
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
<<<<<<< HEAD
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
}
})
=======
  //   ssl: {
  //     rejectUnauthorized: false,
  // }
});
>>>>>>> f7963a169d1bb6eeafdaf8151a988d3b61977528

const db = new Pool(pool);

db.connect((err) => {
  if (err) {
    console.log("Failed to connect database...", err.message);
    process.exit(1);
  }
  console.log("Successfully connect database...");
});

module.exports = db;
