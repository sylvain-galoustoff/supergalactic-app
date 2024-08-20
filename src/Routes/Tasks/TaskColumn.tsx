import { TaskType } from "../../models/task";
import TaskCard from "./TaskCard";

export type TaskColumnType = {
  status: "backlog" | "doing" | "review" | "done";
  data: TaskType[];
};

function TaskColumn({ status, data }: TaskColumnType) {
  const renderBacklog = data.map((task) => {
    if (task.status === status) {
      return <TaskCard key={task.id} task={task} />;
    }
  });

  return (
    <div className="task-column">
      <h3 className="task-column-header">{status}</h3>
      <div className="tasks" id="tasks-backlog">
        {renderBacklog}
      </div>
    </div>
  );
}

export default TaskColumn;
