import { useState, FormEvent } from "react";
import {
  IoCheckmarkOutline,
  IoCloseOutline,
  IoListOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import { Button, InputField, Select, TextArea, useToast, InputDate } from "simplegems";
import { useModalContext } from "../../context/ModalContext";
import { TaskType } from "../../models/task";
import { registerTask } from "../../api/taskApi";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { getTime } from "date-fns/getTime";

function AddTask() {
  const resetForm: TaskType = {
    uid: "",
    id: "",
    projectId: "",
    clientId: "",
    taskName: "",
    description: "",
    status: "backlog",
    deadline: Date.now(),
  };

  const projects = useSelector((state: RootState) => state.projects);
  const { setBox } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(resetForm);
  const sendToast = useToast();

  const options = projects.map((project) => ({
    label: project.projectName,
    value: project.id,
  }));

  const updateForm = (value: string, target: string) => {
    setForm((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  const handleSelectChange = (value: { [key: string]: string }) => {
    setForm((prevState) => ({
      ...prevState,
      projectId: value.value,
    }));
  };

  const handleDateChange = (value: Date) => {
    setForm((prevState) => ({
      ...prevState,
      deadline: value.getTime(),
    }));
  };

  const submitTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formCopy = { ...form };
    let date = new Date(formCopy.deadline);
    date.setHours(0, 0, 0, 0);
    const newDate = getTime(date);
    formCopy.deadline = newDate;

    const response = await registerTask(formCopy);
    if (response.success) {
      setIsLoading(false);
      closeModal();
      sendToast("success", response.message);
    } else {
      setIsLoading(false);
      sendToast("danger", response.message);
    }
  };

  const closeModal = () => {
    setBox(null);
    setForm(resetForm);
  };

  return (
    <div className="card" id="box">
      <h2 className="card-header black">
        <IoListOutline /> Ajouter une tâche{" "}
        <IoCloseOutline id="close-box" onClick={closeModal} />
      </h2>
      <form onSubmit={submitTask}>
        <div className="card-content" id="box-content">
          <InputField
            id="task-name"
            label="Titre de la tâche"
            iconBefore={<IoListOutline />}
            type="text"
            value={form.taskName}
            onChange={(value: string) => updateForm(value, "taskName")}
          />
          <Select
            id="task-project"
            placeholder="Faites votre choix"
            label="Tâché liée au projet :"
            iconBefore={<IoSparklesOutline />}
            data={options}
            onChange={handleSelectChange}
          />
          <InputDate
            label="Date limite"
            onChange={(value: Date) => handleDateChange(value)}
          />
          <TextArea
            id="task-note"
            label="Description"
            value={form.description}
            onChange={(value: string) => updateForm(value, "description")}
            rows={5}
          />
        </div>
        <div className="card-footer button-group">
          <Button
            type="button"
            onClick={closeModal}
            label="Annuler"
            iconBefore={<IoCloseOutline />}
          />
          <Button
            type="submit"
            label="Valider"
            variant="primary"
            iconBefore={<IoCheckmarkOutline />}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
}

export default AddTask;
