import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ClientType } from "../models/client";

const initialState: ClientType[] = [];

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    storeClients: (_, action: PayloadAction<ClientType[]>) => {
      return action.payload;
    },
  },
});

export const { storeClients } = clientsSlice.actions;

export default clientsSlice.reducer;
