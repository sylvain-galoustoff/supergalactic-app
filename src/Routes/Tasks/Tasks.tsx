import { IoListOutline } from "react-icons/io5";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import ModalButton from "../../Components/ui/Modals/ModalButton";

function Tasks() {
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
        <div className="task-column">
          <h3 className="task-column-header">Backlog</h3>
          <div className="tasks" id="tasks-backlog">
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="task-column">
          <h3 className="task-column-header">En cours</h3>
          <div className="tasks" id="tasks-doing">
            <TaskCard />
          </div>
        </div>
        <div className="task-column">
          <h3 className="task-column-header">Review</h3>
          <div className="tasks" id="tasks-review">
            <TaskCard />
            <TaskCard />
          </div>
        </div>
        <div className="task-column">
          <h3 className="task-column-header">Done</h3>
          <div className="tasks" id="tasks-done">
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Tasks;
