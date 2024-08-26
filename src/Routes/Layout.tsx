import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster, useToastsList } from "simplegems";
import { useModalContext } from "../context/ModalContext";
import { useDispatch } from "react-redux";
import { observeClients } from "../api/clientApi";
import { observeProjects } from "../api/projectApi";
import Sidebar from "../Components/ui/Sidebar";
import Modal from "../Components/ui/Modals/Modal";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProtectedRoutes from "./Protected/ProtectedRoutes";
import Clients from "./Clients/Clients";
import Projects from "./Projects/Projects";
import Tasks from "./Tasks/Tasks/Tasks";
import { observeTasks } from "../api/taskApi";
import SingleTask from "./Tasks/SingleTask/SingleTask";
import Calendar from "./Calendar/Calendar";

function Layout() {
  const { toastList, removeToast } = useToastsList();
  const { box } = useModalContext();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeClients = observeClients();
    const unsubscribeProjects = observeProjects();
    const unsubscribeTasks = observeTasks();

    return () => {
      unsubscribeClients();
      unsubscribeProjects();
      unsubscribeTasks();
    };
  }, [dispatch]);

  return (
    <div id="app">
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/taches" element={<Tasks />} />
          <Route path="/taches/:id" element={<SingleTask />} />
          <Route path="/calendrier" element={<Calendar />} />
        </Route>
      </Routes>
      <Toaster
        toastsList={toastList}
        onRemoveToast={removeToast}
        automaticRemove={true}
        id="toaster"
      />
      {box && <Modal box={box} />}
    </div>
  );
}

export default Layout;
