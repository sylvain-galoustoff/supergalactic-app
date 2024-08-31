import { IoCloseOutline, IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { Button, useToast } from "simplegems";
import { useModalContext } from "../../context/ModalContext";
import { TaskType } from "../../models/task";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import TaskDeadline from "./TaskDeadline";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ModalButton from "../../Components/ui/Modals/ModalButton";
import { deleteTask } from "../../api/taskApi";
import EditTask from "./EditTask";

type TaskDetailsProps = {
  task: TaskType;
};

function TaskDetails({ task }: TaskDetailsProps) {
  const projects = useSelector((state: RootState) => state.projects);
  const [projectName, setProjectName] = useState<string | undefined>("");
  const { setBox } = useModalContext();
  const sendToast = useToast();

  useEffect(() => {
    const currentProject = projects.find(
      (project) => project.id === task.projectId
    )?.projectName;
    setProjectName(currentProject);
  });

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
    <div className="task-card task-details" id="box">
      <div className="card-header">
        <p>{projectName}</p>
        <h2 className="black">
          {task.taskName}
          <IoCloseOutline id="close-box" onClick={closeModal} />
        </h2>
      </div>
      <div>
        <div className="card-content" id="box-content">
          <div className="task-deadlines">
            <TaskDeadline deadline={task.deadline} />
            <p className="help">
              Deadline : {format(new Date(task.deadline), "do MMMM yyyy")}
            </p>
          </div>
          {task.description && (
            <div className="task-note">
              <p className="task-note-label">Note</p>
              <p>{task.description}</p>
            </div>
          )}
        </div>
        <div className="card-footer task-footer">
          <div className="action-left">
            <Button
              type="button"
              label="Supprimer"
              variant="danger"
              iconBefore={<IoTrashOutline />}
              onClick={handleDeleteTask}
            />
          </div>
          <div className="action-right">
            <ModalButton
              label="Editer"
              icon={<IoCreateOutline />}
              modal={<EditTask task={task} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
