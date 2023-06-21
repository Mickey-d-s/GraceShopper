import "./App.css";
import useAuth from "./components/hooks/useAuth";
import Nav from "./components/Nav";
import Home from "./components/Home";
// import Profile from "./components/Profile";

function App() {
  const { token, user } = useAuth();
  console.log("token in app.jsx:", token);
  console.log("User in app.jsx:", user);
  return (
    <div>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Home />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
