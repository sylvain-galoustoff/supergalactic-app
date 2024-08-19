import { IoPersonAddOutline } from "react-icons/io5";
import ModalButton from "../../Components/ui/Modals/ModalButton";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";
import AddClient from "./AddClient";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { DataSearch, DataTable, useToast } from "simplegems";
import { ClientType } from "../../models/client";
import { deleteClient, updateClient } from "../../api/clientApi";
import { useEffect, useState } from "react";

function Clients() {
  const clientsData = useSelector((state: RootState) => state.clients);
  const [filteredData, setFilteredData] = useState<ClientType[]>([]);
  const [termsPool, setTermsPool] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const sendToast = useToast();

  const clientsColumns = ["clientName", "contactName", "contactMail", "contactTel"];
  const clientsLabels = {
    clientName: "Nom du client",
    contactName: "Nom du contact",
    contactMail: "Email du contact",
    contactTel: "Téléphone du contact",
  };

  useEffect(() => {
    const clientsDataValues: string[] = [];
    clientsData.forEach(({ uid, id, contactMail, contactTel, ...client }) => {
      Object.values(client).map((value) => {
        if (value !== "") clientsDataValues.push(value);
      });
    });
    const pool = Array.from(new Set(clientsDataValues));
    setTermsPool(pool);
  }, [clientsData]);

  useEffect(() => {
    function findTerms(term: string) {
      return clientsData.filter((item) => {
        return ["clientName", "contactName"].some((key) => {
          return item[key as keyof ClientType].toLowerCase().includes(term.toLowerCase());
        });
      });
    }

    if (searchTerm.length > 0) {
      const result = findTerms(searchTerm);
      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm, clientsData]);

  const handleDelete = async (value: { [key: string]: string }) => {
    const response = await deleteClient(value as Record<keyof ClientType, string>);
    if (response.success) {
      sendToast("success", response.message);
    } else {
      sendToast("danger", response.message);
    }
  };

  const updateField = async (value: { [key: string]: string }) => {
    const response = await updateClient(value as Record<keyof ClientType, string>);
    if (response.success) {
      sendToast("success", response.message);
    } else {
      sendToast("danger", response.message);
    }
  };

  const handleTerm = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <main id="clients">
      <PageHeader title="Clients" />
      <Toolbar
        left={<DataSearch callback={handleTerm} data={termsPool} id="table-search" />}
        right={
          <ModalButton
            label="Ajouter un client"
            icon={<IoPersonAddOutline />}
            modal={<AddClient />}
          />
        }
      />
      <div className="zone content-zone">
        <DataTable
          rows={filteredData.length > 0 ? filteredData : clientsData}
          columns={clientsColumns}
          labels={clientsLabels}
          deleteButton
          onDelete={handleDelete}
          onSubmitField={updateField}
        />
      </div>
    </main>
  );
}

export default Clients;
