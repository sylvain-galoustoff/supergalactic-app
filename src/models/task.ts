export type TaskType = {
  uid: string;
  id: string;
  projectId: string;
  taskName: string;
  description: string;
  status: "backlog" | "doing" | "review" | "done";
  deadline: number;
};
