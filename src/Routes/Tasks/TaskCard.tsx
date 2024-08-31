import { useEffect, useState } from "react";
import { IoArrowForwardOutline, IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { TaskType } from "../../models/task";
import TaskDeadline from "./TaskDeadline";
import { DragEvent } from "react";
import { useModalContext } from "../../context/ModalContext";
import TaskDetails from "./TaskDetails";
import { deleteTask, getProjectNameFromProjectId } from "../../api/taskApi";
import { Button, useToast } from "simplegems";
import ModalButton from "../../Components/ui/Modals/ModalButton";
import EditTask from "./EditTask";

export type TaskCardProps = {
  task: TaskType;
};

function TaskCard({ task }: TaskCardProps) {
  const [currentProject, setCurrentProject] = useState<string | undefined>("");
  const { setBox } = useModalContext();
  const sendToast = useToast();

  useEffect(() => {
    const projectName = getProjectNameFromProjectId(task.projectId);
    setCurrentProject(projectName);
  }, [task]);

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

  const closeModal = () => {
    setBox(null);
  };

  const handleDeleteTask = async () => {
    const response = await deleteTask(task);
    if (response.success) {
      closeModal();
      sendToast("success", response.message);
    }
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
        <div className="action-left">
          <Button
            label="Supprimer"
            iconBefore={<IoTrashOutline />}
            variant="danger"
            onClick={handleDeleteTask}
          />
          <ModalButton
            label="Modifier"
            icon={<IoCreateOutline />}
            modal={<EditTask task={task} />}
          />
        </div>
        <div className="action-right">
          <Button
            label="Détails"
            iconAfter={<IoArrowForwardOutline />}
            onClick={showDetails}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
