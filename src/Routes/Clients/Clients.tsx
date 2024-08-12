import { IoPersonAddOutline } from "react-icons/io5";
import ModalButton from "../../Components/ui/Modals/ModalButton";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";
import AddClient from "./AddClient";

function Clients() {
  return (
    <main>
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
    </main>
  );
}

export default Clients;
