import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventType } from "../models/event";

const initialState: EventType[] = [];

const EventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    storeEvent: (_, action: PayloadAction<EventType[]>) => {
      return action.payload;
    },
  },
});

export const { storeEvent } = EventsSlice.actions;

export default EventsSlice.reducer;
