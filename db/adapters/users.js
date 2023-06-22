const client = require("../client");

async function createUser({ username, email, password }) {
  try {
    console.log({ username, email, password });
    const {
      rows: [user],
    } = await client.query(
      `
<<<<<<< HEAD
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

async function getUserbytoken() {
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
=======
    INSERT INTO users(username, email,password )
            VALUES($1,$2,$3)
            ON CONFLICT (username) DO NOTHING
            returning *;
`,
      [username, email, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  const {
    rows: [user],
  } = await client.query(
    `SELECT * FROM users WHERE username=$1;
        `,
    [username]
  );
  console.log("getUserByUsername", user);
  return user;
}

module.exports = { createUser, getUserByUsername };
>>>>>>> 5d317c76d22f53b5c5e8887322eb4035b92da436
