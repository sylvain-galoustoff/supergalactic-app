import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../models/task";

const initialState: TaskType[] = [];

const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    storeTask: (_, action: PayloadAction<TaskType[]>) => {
      return action.payload;
    },
  },
});

export const { storeTask } = TasksSlice.actions;

export default TasksSlice.reducer;
