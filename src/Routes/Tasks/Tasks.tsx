import { IoListOutline } from "react-icons/io5";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";
import AddTask from "./AddTask";
import ModalButton from "../../Components/ui/Modals/ModalButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TaskColumn from "./TaskColumn";

function Tasks() {
  const tasksData = useSelector((state: RootState) => state.tasks);

  return (
    <main id="clients">
      <PageHeader title="Tâches" />
      <Toolbar
        right={
          <ModalButton
            label="Ajouter une tâche"
            icon={<IoListOutline />}
            modal={<AddTask />}
          />
        }
      />
      <div className="zone content-zone" id="task-manager">
        <TaskColumn status="backlog" data={tasksData} />
        <TaskColumn status="doing" data={tasksData} />
        <TaskColumn status="review" data={tasksData} />
        <TaskColumn status="done" data={tasksData} />
      </div>
    </main>
  );
}

export default Tasks;
