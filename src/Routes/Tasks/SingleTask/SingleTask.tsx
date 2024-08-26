import { useState, useEffect } from "react";
import PageHeader from "../../../Components/ui/PageHeader/PageHeader";
import { TaskType } from "../../../models/task";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";

function SingleTask() {
  const [task, setTask] = useState<TaskType>({
    uid: "",
    id: "",
    projectId: "",
    taskName: "",
    description: "",
    status: "backlog",
    deadline: 0,
  });
  const tasks = useSelector((state: RootState) => state.tasks);
  const params = useParams();

  useEffect(() => {
    console.log(params);
    const currentTask = [...tasks].find((task) => task.id === params.id);
    currentTask && setTask(currentTask);
  });

  return (
    <main id="single-task">
      <PageHeader title={task.taskName} />
      <div className="zone content-zone" id="task-manager"></div>
    </main>
  );
}

export default SingleTask;
