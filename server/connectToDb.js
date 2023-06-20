const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

let connection;

const connectToDb = () => {
  if (connection) return Promise.resolve(connection);

  connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL:", err);
        reject(err);
        return;
      }
      console.log("🚀 MySQL connected");
      resolve(connection);
    });
  });
};

module.exports = { connectToDb };
