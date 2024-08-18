import { useState, FormEvent } from "react";
import {
  IoSparklesOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoBusinessOutline,
} from "react-icons/io5";
import { Button, InputField, useToast, Select } from "simplegems";
import { ProjectType } from "../../models/project";
import { useModalContext } from "../../context/ModalContext";
import { registerProject } from "../../api/projectApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function AddProject() {
  const resetForm: ProjectType = {
    uid: "",
    id: "",
    clientId: "",
    projectName: "",
  };

  const { setBox } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(resetForm);
  const sendToast = useToast();
  const clients = useSelector((state: RootState) => state.clients);
  console.log(clients);

  const options = clients.map((client) => ({
    label: client.clientName,
    value: client.id,
  }));

  console.log(options);

  const updateForm = (value: string, target: string) => {
    setForm((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  const handleSelectChange = (value: { [key: string]: string }) => {
    setForm((prevState) => ({
      ...prevState,
      clientId: value.value,
    }));
  };

  const submitProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await registerProject(form);
    if (response.success) {
      setIsLoading(false);
      closeModal();
      sendToast("success", `${form.projectName} enregistré dans vos données projet.`);
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
        <IoSparklesOutline /> Ajouter un Projet{" "}
        <IoCloseOutline id="close-box" onClick={closeModal} />
      </h2>
      <form onSubmit={submitProject}>
        <div className="card-content" id="box-content">
          <InputField
            id="project-name"
            label="Nom du projet"
            iconBefore={<IoSparklesOutline />}
            type="text"
            value={form.projectName}
            onChange={(value) => updateForm(value, "projectName")}
          />
          <Select
            id="select-client"
            placeholder="Faites votre choix"
            label="Client du projet"
            iconBefore={<IoBusinessOutline />}
            data={options}
            onChange={handleSelectChange}
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

export default AddProject;
