import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/ui/Sidebar";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProtectedRoutes from "./Protected/ProtectedRoutes";

function Layout() {
  return (
    <div id="app">
      <Sidebar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Layout;
