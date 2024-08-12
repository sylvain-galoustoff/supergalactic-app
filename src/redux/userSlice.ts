import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../models/user";

const initialState: UserType = {
  uid: "",
  email: "",
  displayName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserType>) => {
      return action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
  },
});

export const { setUser, setDisplayName } = userSlice.actions;

export default userSlice.reducer;
