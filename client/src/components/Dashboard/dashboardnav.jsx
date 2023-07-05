import { Link } from "react-router-dom";
import { Routes } from "react-router-dom";


export function Dashboardnav() {
  try {
    return (
      <>
        <nav className="nav">
          <div className="Link">
            <Link to="inventory">inventory</Link>
          </div>
          <div className="Link">
            <Link to="/api/users">users</Link>
          </div>
        </nav>
      </>
    );
  } catch (error) {
    throw error;
  }
}
