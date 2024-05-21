const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);

let db;

async function connectToDatabase() {
  if (!db) {
    try {
      const conn = await client.connect();
      db = conn.db(process.env.MONGO_DB);
      console.log("Connected to database");
    } catch (e) {
      console.error(e);
    }
  }
  return db;
}

module.exports = connectToDatabase;