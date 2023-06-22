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
    const success = true;
    const message = "successfully created user";
    console.log("success in creating user", user);
    return { success, message, user };
  } catch (error) {
    console.log(error);
    const success = false;
    const message = "failed to create user";
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
    console.log("user from getUserbyUsername:", user);
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUserbytoken(token) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * from users
    WHERE password = $1
    `,
      [token]
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser, getAllUsers, getUserByUsername, getUserbytoken };
