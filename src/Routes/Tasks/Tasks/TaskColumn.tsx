import { DragEvent, useEffect, useState } from "react";
import { TaskType } from "../../../models/task";
import TaskCard from "./TaskCard";
import { patchTask } from "../../../api/taskApi";
import { useToast } from "simplegems";

export type TaskColumnType = {
  status: "backlog" | "doing" | "review" | "done";
  data: TaskType[];
};

function TaskColumn({ status, data }: TaskColumnType) {
  const sendToast = useToast();
  const [orderedTasks, setOrderedTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const filteredData = [...data].filter((task) => task.status === status);
    const orderedData = filteredData.sort((a, b) => a.deadline - b.deadline);
    setOrderedTasks(orderedData);
  }, [data]);

  const renderTasks = orderedTasks.map((task) => {
    if (task.status === status) {
      return <TaskCard key={task.id} task={task} />;
    }
  });

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.background =
      "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.background =
      "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))";
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.background =
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))";
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.background =
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))";
  };

  const handleOnDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.background =
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))";
    const targetId = e.currentTarget.id;
    const newCardStatus = targetId.split("tasks-")[1];
    const taskId = e.dataTransfer.getData("text/plain");
    const response = await patchTask(taskId, "status", newCardStatus);
    if (response.success === false) {
      sendToast("danger", response.message);
    }
  };

  return (
    <div className="task-column">
      <div className="task-column-header">
        <h3 className="task-column-title">{status}</h3>
      </div>
      <div
        className="tasks drag-over"
        id={`tasks-${status}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
        onDrop={handleOnDrop}
      >
        {renderTasks}
      </div>
    </div>
  );
}

export default TaskColumn;
