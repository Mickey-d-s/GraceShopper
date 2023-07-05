import { Link } from "react-router-dom";
import { Dashboardnav } from "./dashboardnav";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  try {
    return (
      <>
        <Dashboardnav />
        <Outlet />
      </>
    );
  } catch (error) {
    throw error;
  }
}
