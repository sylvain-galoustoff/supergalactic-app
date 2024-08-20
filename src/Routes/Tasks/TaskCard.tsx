import { IoEllipse, IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TaskType } from "../../models/task";
import TaskDeadline from "./TaskDeadline";

export type TaskCardProps = {
  task: TaskType;
};

function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="task-card">
      <h4 className="task-header">
        <IoEllipse className="priority-icon primary" /> {task.taskName}
      </h4>
      <div className="task-body">
        <p className={`task-description ${!task.description ? "italic" : null}`}>
          {task.description ? task.description : "Aucune note"}
        </p>
        <TaskDeadline deadline={task.deadline} />
      </div>
      <div className="task-footer">
        <Link to={`/tache/${task.id}`}>
          Détails <IoArrowForwardOutline />
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
