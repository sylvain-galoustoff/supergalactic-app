import { IoPersonAddOutline } from "react-icons/io5";
import ModalButton from "../../Components/ui/Modals/ModalButton";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";
import AddClient from "./AddClient";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { DataTable, useToast } from "simplegems";
import { ClientType } from "../../models/client";
import { deleteClient } from "../../api/clientApi";

function Clients() {
  const clientsData = useSelector((state: RootState) => state.clients);
  console.log(clientsData);

  const sendToast = useToast();
  const clientsColumns = ["clientName", "contactName", "contactMail", "contactTel"];
  const clientsLabels = {
    clientName: "Nom du client",
    contactName: "Nom du contact",
    contactMail: "Email du contact",
    contactTel: "Téléphone du contact",
  };

  const handleDelete = async (value: { [key: string]: string }) => {
    const response = await deleteClient(value as Record<keyof ClientType, string>);
    if (response.success) {
      sendToast("success", response.message);
    } else {
      sendToast("danger", response.message);
    }
  };

  return (
    <main id="clients">
      <PageHeader title="Clients" />
      <Toolbar
        right={
          <ModalButton
            label="Ajouter un client"
            icon={<IoPersonAddOutline />}
            modal={<AddClient />}
          />
        }
      />
      <div className="zone" id="content-zone">
        <DataTable
          rows={clientsData}
          columns={clientsColumns}
          labels={clientsLabels}
          deleteButton
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}

export default Clients;
