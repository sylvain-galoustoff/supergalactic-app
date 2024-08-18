import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectType } from "../models/project";

const initialState: ProjectType[] = [];

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    storeProject: (_, action: PayloadAction<ProjectType[]>) => {
      return action.payload;
    },
  },
});

export const { storeProject } = projectSlice.actions;

export default projectSlice.reducer;
