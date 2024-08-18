import { useState, FormEvent } from "react";
import { IoSparklesOutline, IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import { Button, InputField, useToast } from "simplegems";
import { ProjectType } from "../../models/project";
import { useModalContext } from "../../context/ModalContext";
import { registerProject } from "../../api/projectApi";

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

  const updateForm = (value: string, target: string) => {
    setForm((prevState) => ({
      ...prevState,
      [target]: value,
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
