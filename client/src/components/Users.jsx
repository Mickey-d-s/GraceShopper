import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/userAuth";
import { Outlet } from "react-router-dom";

export default function allUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.user_id}>
          <p>User Id: {user.user_id}</p>
          <p>Username: {user.username}</p>
          <p>email: {user.email}</p>
        </div>
      ))}
    </div>
  );
}
