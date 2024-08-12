import { createContext, useContext, useState } from "react";

type ProjectContextType = {
  project: string;
  setProject: (project: string) => void;
};

export const ProjectContext = createContext<ProjectContextType>({
  project: "",
  setProject: () => {},
});

export const ProjectContextProvider = ({ children }: { children: JSX.Element }) => {
  const [project, setProject] = useState("Tous les projets (context)");
  const valueProjectContext = { project, setProject };

  return (
    <ProjectContext.Provider value={valueProjectContext}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
