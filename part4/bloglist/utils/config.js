require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
// const SECRET = process.env.SECRET || 'your_secret_key'; // Add this line

module.exports = {
  MONGODB_URI,
  PORT,
};
