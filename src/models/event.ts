export type EventType = {
  uid: string;
  id: string;
  eventName: string;
  date: number;
  hour: string;
  taskId?: string;
  projectId?: string;
  clientId?: string;
};
