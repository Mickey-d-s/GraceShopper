import useAuth from "../components/hooks/useAuth";
import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(useAuth());
  console.log("user:", user);

  return (
    <>
      <div className="profilePage">
        <h1> Welcome to your Profile {user.username}</h1>
        <h2> order history</h2>
        <div className="orderhistory">place your order now!</div>
      </div>
    </>
  );
}
