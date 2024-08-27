export type EventType = {
  uid: string;
  id: string;
  eventName: string;
  date: number;
  time: string;
  taskId?: string;
  projectId?: string;
  clientId?: string;
};
