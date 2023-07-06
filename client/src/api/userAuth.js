export default async function registerUser(username, email, password, adm) {
  const response = await fetch("api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  console.log("RESPONSE: ", response);
  const { success, message, data } = await response.json();
  console.log({ success, message, data });
  if (!success) {
    throw {
      message,
    };
  }
  console.log(success, message, data);
  return { success, message, data };
}

export async function loginUser(username, password) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
}
export async function logout() {
  const response = await fetch("/api/users/logout");
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
}


export async function getAllUsers() {
  const response = await fetch("/api/users/");
  const { rows } = await response.json();
  console.log("ALL USERS:", rows);
  if (!success) {
    throw {
      message,
    };
  }
  return { rows };
}

export async function fetchMe() {
  const response = await fetch("/api/users/me");
  const { success, message, user } = await response.json();
  console.log("INSIDE FETCH ME:       ", { success, message, user });
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, user };
}
