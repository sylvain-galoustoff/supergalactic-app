import { IoSparklesOutline } from "react-icons/io5";
import ModalButton from "../../Components/ui/Modals/ModalButton";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { DataSearch, DataTable, useToast } from "simplegems";
import { ProjectTableType, ProjectType } from "../../models/project";
import { useEffect, useState } from "react";
import { deleteProject, updateProject } from "../../api/projectApi";
import AddProject from "./AddProject";

function Projects() {
  const projectsData = useSelector((state: RootState) => state.projects);
  const clientsData = useSelector((state: RootState) => state.clients);
  const [rawData, setRawData] = useState<ProjectTableType[]>([]);
  const [filteredData, setFilteredData] = useState<ProjectTableType[]>([]);
  const [termsPool, setTermsPool] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const sendToast = useToast();

  const projectsColumns = ["projectName", "clientName"];
  const projectsLabels = {
    projectName: "Nom du projet",
    clientName: "Nom du client",
  };

  useEffect(() => {
    const formatProjectsForDataTable = projectsData.map((project) => {
      const clientData = clientsData.find((client) => client.id === project.clientId);
      return {
        ...project,
        clientName: clientData ? clientData.clientName : "client non trouvé",
      };
    });
    setRawData(formatProjectsForDataTable);
  }, [clientsData, projectsData]);

  useEffect(() => {
    const formatProjectsForDataSearch: string[] = [];
    rawData.forEach(({ uid, id, clientId, ...project }) => {
      Object.values(project).map((value) => {
        if (value !== "") formatProjectsForDataSearch.push(value);
      });
    });
    const pool = Array.from(new Set(formatProjectsForDataSearch));

    setTermsPool(pool);
  }, [rawData]);

  useEffect(() => {
    function findTermsInDataTable(term: string) {
      return rawData.filter((item) => {
        return ["projectName", "clientName"].some((key) => {
          return item[key as keyof ProjectType]
            .toLowerCase()
            .includes(term.toLowerCase());
        });
      });
    }

    if (searchTerm.length > 0) {
      const result = findTermsInDataTable(searchTerm);
      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm, projectsData]);

  const handleDelete = async (value: { [key: string]: string }) => {
    const response = await deleteProject(value as Record<keyof ProjectType, string>);
    if (response.success) {
      sendToast("success", response.message);
    } else {
      sendToast("danger", response.message);
    }
  };

  const updateField = async (value: { [key: string]: string }) => {
    const response = await updateProject(value as Record<keyof ProjectType, string>);
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
            label="Ajouter un projet"
            icon={<IoSparklesOutline />}
            modal={<AddProject />}
          />
        }
      />
      <div className="zone content-zone">
        <DataTable
          rows={filteredData.length > 0 ? filteredData : rawData}
          columns={projectsColumns}
          labels={projectsLabels}
          deleteButton
          onDelete={handleDelete}
          onSubmitField={updateField}
        />
      </div>
    </main>
  );
}

export default Projects;
