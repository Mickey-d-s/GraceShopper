import { Link } from "react-router-dom";
import { Routes } from "react-router-dom";

export function Dashboardnav() {
  try {
    return (
      <>
        <nav className="nav">
          <div className="Link">
            <Link to="inventory">Products</Link>
          </div>
          <div className="Link">
            <Link to="users">Users</Link>
          </div>
        </nav>
      </>
    );
  } catch (error) {
    throw error;
  }
}
