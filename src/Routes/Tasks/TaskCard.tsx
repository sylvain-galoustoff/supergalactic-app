import { useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { TaskType } from "../../models/task";
import TaskDeadline from "./TaskDeadline";
import { DragEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useModalContext } from "../../context/ModalContext";
import TaskDetails from "./TaskDetails";

export type TaskCardProps = {
  task: TaskType;
};

function TaskCard({ task }: TaskCardProps) {
  const projects = useSelector((state: RootState) => state.projects);
  const [currentProject, setCurrentProject] = useState<string | undefined>("");
  const { setBox } = useModalContext();

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

  const showDetails = () => {
    setBox(<TaskDetails task={task} />);
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
        <TaskDeadline deadline={task.deadline} />
        <p className={`task-description ${!task.description ? "italic" : null}`}>
          {task.description ? task.description : "Aucune note"}
        </p>
      </div>
      <div className="task-footer">
        <button type="button" onClick={showDetails}>
          Détails <IoArrowForwardOutline />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
