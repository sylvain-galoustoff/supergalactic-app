import { Routes, Route } from "react-router-dom";
import { Toaster, useToastsList } from "simplegems";
import Sidebar from "../Components/ui/Sidebar";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProtectedRoutes from "./Protected/ProtectedRoutes";
import Clients from "./Clients/Clients";

function Layout() {
  const { toastList, removeToast } = useToastsList();

  return (
    <div id="app">
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
        </Route>
      </Routes>
      <Toaster
        toastsList={toastList}
        onRemoveToast={removeToast}
        automaticRemove={true}
        id="toaster"
      />
    </div>
  );
}

export default Layout;
