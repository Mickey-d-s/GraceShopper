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
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 5) {
      setError("username must be longer than 5 characters");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("passwords don't match");
      return;
    }

    try {
      let result;
      if (pathname === "/login") {
        result = await loginUser(username, password);
      }
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
          <input
            type="password"
            placeholder="password confirmation"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          {pathname === "/register"
            ? "Already have an account? "
            : "Don't have an account? "}
          <Link to={pathname === "/register" ? "/register" : "/login"}>
            {pathname === "/login" ? "Sign Up" : "Login Here"}
          </Link>
        </p>
      </div>
    </div>
  );
}
