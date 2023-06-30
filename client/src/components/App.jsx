import Nav from "../components/Nav";
import "../App.css";
import "../index.css";
import Menu from "./Menu";
import Registerform from "../components/auth/RegisterForm";
import LoginForm from "../components/auth/LoginForm";
import HealthPage from "../components/HealthPage";
import Profile from "../components/Profile";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./home";
import Footer from "./Footer";
import Inventory from "../components/Inventory";
// import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Registerform />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Menu />} />
        <Route path="/inventories" element={<Inventory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
