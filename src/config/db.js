require("dotenv").config();
const {Pool} = require('pg')
const pool = new Pool({
  user: 'd1jejlc9f9ihrv',
  host: 'ec2-44-195-162-77.compute-1.amazonaws.com',
  database: 'veksikcdninjtz',
  password: 'f5231ea69c5fca23c3e963df4cec385de4f7d7d1c3d6f3d2e33329e1ca912cdb',
  port: 5432,
  connectionString: 'postgres://veksikcdninjtz:f5231ea69c5fca23c3e963df4cec385de4f7d7d1c3d6f3d2e33329e1ca912cdb@ec2-44-195-162-77.compute-1.amazonaws.com:5432/d1jejlc9f9ihrv',
  ssl: {
    rejectUnauthorized: false,
}
})

// const db = new Pool(pool);

// db.connect((err) => {
//   if (err) {
//     console.log("Failed to connect database...", err.message);
//     process.exit(1);
//   }
//   console.log("Successfully connect database...");
// });

module.exports = pool;
