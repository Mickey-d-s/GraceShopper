const { client } = require("../client");

async function createUser({ username, email, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, email, password)
            VALUES($1,$2,$3)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `,
      [username, email, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
