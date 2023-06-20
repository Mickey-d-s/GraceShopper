const client = require("../client");

async function createUser({ username, email, password }) {
  try {
    console.log({ username, email, password });
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, email,password )
            VALUES($1,$2,$3)
            ON CONFLICT (username) DO NOTHING
            returning *;
`,
      [username, email, password]
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT * FROM users WHERE username=$1;
        `,
      [username]
    );
    console.log("getUserByUsername", user);
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser, getUserByUsername };
