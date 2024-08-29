import { useEffect, useState } from "react";
import { IoEllipse, IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TaskType } from "../../../models/task";
import TaskDeadline from "./TaskDeadline";
import { DragEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export type TaskCardProps = {
  task: TaskType;
};

function TaskCard({ task }: TaskCardProps) {
  const projects = useSelector((state: RootState) => state.projects);
  const [currentProject, setCurrentProject] = useState<string | undefined>("");

  useEffect(() => {
    const projectName = projects.find(
      (project) => project.id === task.projectId
    )?.projectName;
    setCurrentProject(projectName);
  }, []);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.currentTarget.style.opacity = "0.5";
    e.dataTransfer.setData("cardId", task.id);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
  };

  return (
    <div
      className="task-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="task-header">
        <h4 title={task.taskName}>{task.taskName}</h4>
        <p className="small">{currentProject}</p>
      </div>
      <div className="task-body">
        <p className={`task-description ${!task.description ? "italic" : null}`}>
          {task.description ? task.description : "Aucune note"}
        </p>
        <TaskDeadline deadline={task.deadline} />
      </div>
      <div className="task-footer">
        <Link to={`/taches/${task.id}`}>
          Détails <IoArrowForwardOutline />
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
