import { IoEllipse, IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TaskType } from "../../models/task";

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
        <p className="task-deadline help danger">Dans 4 jours</p>
      </div>
      <div className="task-footer">
        <Link to={`/task/${task.id}`}>
          Détails <IoArrowForwardOutline />
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
