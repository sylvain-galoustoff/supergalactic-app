import { IoCloseOutline, IoCreateOutline } from "react-icons/io5";
import { Button } from "simplegems";
import { useModalContext } from "../../context/ModalContext";
import { TaskType } from "../../models/task";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import TaskDeadline from "./TaskDeadline";
import { useEffect, useState } from "react";
import { format } from "date-fns";

type TaskDetailsProps = {
  task: TaskType;
};

function TaskDetails({ task }: TaskDetailsProps) {
  const projects = useSelector((state: RootState) => state.projects);
  const [projectName, setProjectName] = useState<string | undefined>("");
  const { setBox } = useModalContext();

  useEffect(() => {
    const currentProject = projects.find(
      (project) => project.id === task.projectId
    )?.projectName;
    setProjectName(currentProject);
  });

  const closeModal = () => {
    setBox(null);
  };

  return (
    <div className="task-details" id="box">
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
          <p className="task-note">
            <p className="task-note-label">Note</p>
            <p>{task.description}</p>
          </p>
        </div>
        <div className="card-footer button-group">
          <Button
            type="button"
            label="Editer"
            variant="primary"
            iconBefore={<IoCreateOutline />}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
