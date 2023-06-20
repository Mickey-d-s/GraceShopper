const client = require("../client");

async function createUser({ username, email, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, email, password )
            VALUES($1,$2, $3)
            ON CONFLICT (username) DO NOTHING
            returning *
            `,
      [username, email, password]
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT * FROM users;
  `);
  return rows;
}
async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
      `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getAllUsers, getUserByUsername };
