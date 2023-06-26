import { useState } from "react";
import { loginUser } from "../../../src/api/userAuth";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 5) {
      setError("username must be longer than 5 characters");
      return;
    }

    try {
      let result;
      result = await loginUser(username, password);

      console.log("Result after login or register: ", result);
      if (result.success) {
        setLoggedIn(true);
        alert("you're logged in !");
        console.log("Auth Results", result);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>{location.pathname.substring(1)}</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            required
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          {pathname === "/login"
            ? "Already have an account? "
            : "Don't have an account? "}
          <Link to={pathname === "/register"}>{"Sign Up"}</Link>
        </p>
      </div>
    </div>
  );
}
