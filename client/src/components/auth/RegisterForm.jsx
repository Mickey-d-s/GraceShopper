import registerUser from "../../api/userAuth";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RegisterForm() {
  const { setLoggedIn, setUser, user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 4) {
      setError("username must be longer than 4 characters");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("passwords don't match");
      return;
    }
    if (email.length === undefined) {
      setError("email is undefined");
      return;
    }

    try {
      let result;

      result = await registerUser({ username, email, password });
      console.log("result:", result);
      if (result.success) {
        console.log("About to set logged in...");
        setLoggedIn(true);
        setUser(result.data.username);
        // alert("you're registered!");
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    setUsername("");
    setPassword("");
  }

  return (
    <div className="register-container">
      <div className="register-form">
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
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
