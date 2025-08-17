import dotenv from "dotenv";

dotenv.config();

import mysql from "mysql2";

const credentials = {
  host: process.env.DB_A,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(credentials);

console.log(connection);

connection.connect((err) => {
  if (err) {
    console.log(
      process.env.DB_HOST,
      process.env.DB_PORT,
      process.env.DB_USER,
      process.env.DB_PW,
      process.env.DB_NAME
    );
    console.log(err.message);
  } else {
    console.log("Connection Success");
  }
});
export default connection;
