import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/userAuth";
import { Outlet } from "react-router-dom";

export default function allUsers() {
  const [users, setUsers] = useState([]);
  const [admin, setadmin] = useState(false);
  const [userid, setuserid] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    }
    async function handlesubmit(e) {
      console.log(admin);
      e.preventDefault();
    }
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>Users</h2>
      {users.map((user, idx) => (
        <div key={user.user_id}>
          <p>User Id: {user.user_id}</p>
          <p>Username: {user.username}</p>
          <p>email: {user.email}</p>
          {user?.adm == true && (
            <>
              <p>admin: True</p>
              <button onClick={() => setadmin(false)}>remove admin</button>
            </>
          )}
          {user?.adm == false && (
            <>
              <p>admin: False</p>
              <button>add admin</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
