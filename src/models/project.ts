export type ProjectType = {
  uid: string;
  id: string;
  clientId: string;
  projectName: string;
};

export type ProjectTableType = ProjectType & {
  clientName: string;
};
