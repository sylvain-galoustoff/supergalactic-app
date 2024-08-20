import { DragEvent } from "react";
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

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <div className="task-column">
      <h3 className="task-column-header">{status}</h3>
      <div
        className="tasks"
        id={`tasks-${status}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
      >
        {renderBacklog}
      </div>
    </div>
  );
}

export default TaskColumn;
