const client = require("../client");

async function createUser({ username, email, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    INSERT INTO users(username, email,password )
            VALUES('test1','test',4321)
            ON CONFLICT (username) DO NOTHING
            returning *

    `);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { createUser };
