import { useState, FormEvent } from "react";
import {
  IoCalendarNumberOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoSparklesOutline,
  IoTextOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { Button, InputField, Select, useToast } from "simplegems";
import { useModalContext } from "../../../context/ModalContext";
import { EventType } from "../../../models/event";
import { registerEvent } from "../../../api/eventApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getTime } from "date-fns/fp/getTime";

type AddEventProps = {
  date: Date;
};

function AddEvent({ date }: AddEventProps) {
  const resetForm: EventType = {
    uid: "",
    id: "",
    eventName: "",
    date: getTime(date),
    hour: "00:00",
    taskId: "",
    projectId: "",
    clientId: "",
  };

  const { setBox } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(resetForm);
  const sendToast = useToast();
  const projects = useSelector((state: RootState) => state.projects);

  const projectOptions = projects.map((project) => ({
    label: project.projectName,
    value: project.id,
  }));

  const closeModal = () => {
    setBox(null);
    setForm(resetForm);
  };

  const updateForm = (value: string, target: string) => {
    setForm((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  const handleSelectProjectChange = (value: { [key: string]: string }) => {
    const getClientIdfromProjectId = projects.find(
      (project) => project.id === value.value
    )?.clientId;

    setForm((prevState) => ({
      ...prevState,
      projectId: value.value,
      clientId: getClientIdfromProjectId,
    }));
  };

  const submitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await registerEvent(form);
    if (response.success) {
      setIsLoading(false);
      closeModal();
      sendToast("success", `${form.eventName} enregistré dans vos données client.`);
    } else {
      setIsLoading(false);
      sendToast("danger", response.message);
    }
  };

  return (
    <div className="card" id="box">
      <h2 className="card-header black">
        <IoCalendarNumberOutline /> Ajouter un Evénement{" "}
        <IoCloseOutline id="close-box" onClick={closeModal} />
      </h2>
      <form onSubmit={submitEvent}>
        <div className="card-content" id="box-content">
          <InputField
            id="event-name"
            label="Nom de l'événement"
            iconBefore={<IoTextOutline />}
            type="text"
            value={form.eventName}
            onChange={(value) => updateForm(value, "eventName")}
          />
          <Select
            id="select-project"
            placeholder="Choisir un projet"
            label="Nom du projet"
            iconBefore={<IoSparklesOutline />}
            data={projectOptions}
            onChange={handleSelectProjectChange}
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

export default AddEvent;
