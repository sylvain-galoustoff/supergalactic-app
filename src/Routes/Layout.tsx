import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/ui/Sidebar";
import Login from "./Login/Login";

function Layout() {
  return (
    <div id="app">
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Layout;
