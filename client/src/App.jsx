import "./App.css";
import useAuth from "./components/hooks/useAuth";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Registerform from "./components/auth/registerform";
import LoginForm from "./components/auth/LoginForm";
import HealthPage from "./components/HealthPage";
import { Routes, Route } from "react-router-dom";

// import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<HealthPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Registerform />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
