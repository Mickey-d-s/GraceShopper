import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../../api/userAuth";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "Stranger" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMe() {
      console.log("Inside of get me...");
      try {
        const { message, success, user } = await fetchMe();

        if (!success) {
          setUser({ username: "Stranger" });
          setLoggedIn(false);
        } else {
          setUser(user);
          setLoggedIn(true);
        }
      } catch (error) {
        setError(error);
      }
    }
    getMe();
  }, [loggedIn]);

  const contextValue = {
    error,
    user,
    setUser,
    loggedIn,
    setLoggedIn,
  };
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  console.log("user from Auth Context", user);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
