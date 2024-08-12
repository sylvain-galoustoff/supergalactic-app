import { useState } from "react";
import {
  IoBusinessOutline,
  IoCallOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoMailOutline,
  IoPersonAddOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { Button, InputField } from "simplegems";
import { ClientType } from "../../models/client";
import { useModalContext } from "../../context/ModalContext";

function AddClient() {
  const resetForm: ClientType = {
    uid: "",
    id: "",
    clientName: "",
    contactName: "",
    contactMail: "",
    contactTel: "",
  };

  const { setBox } = useModalContext();
  const [form, setForm] = useState(resetForm);

  const updateForm = (value: string, target: string) => {
    setForm((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  const closeModal = () => {
    setBox(null);
    setForm(resetForm);
  };

  return (
    <div className="card" id="box">
      <h2 className="card-header black">
        <IoPersonAddOutline /> Ajouter un client{" "}
        <IoCloseOutline id="close-box" onClick={closeModal} />
      </h2>
      <form>
        <div className="card-content" id="box-content">
          <InputField
            id="client-name"
            label="Nom du client"
            iconBefore={<IoBusinessOutline />}
            type="text"
            value={form.clientName}
            onChange={(value) => updateForm(value, "clientName")}
          />
          <fieldset>
            <legend className="black">Contact client</legend>
            <InputField
              id="contact-name"
              label="Nom du contact"
              iconBefore={<IoPersonOutline />}
              type="text"
              value={form.contactName}
              onChange={(value) => updateForm(value, "contactName")}
            />
            <InputField
              id="contact-mail"
              label="Mail du contact"
              iconBefore={<IoMailOutline />}
              type="email"
              value={form.contactMail}
              onChange={(value) => updateForm(value, "contactMail")}
            />
            <InputField
              id="contact-tel"
              label="Téléphone du contact"
              iconBefore={<IoCallOutline />}
              type="tel"
              value={form.contactTel}
              onChange={(value) => updateForm(value, "contactTel")}
            />
          </fieldset>
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
          />
        </div>
      </form>
    </div>
  );
}

export default AddClient;
