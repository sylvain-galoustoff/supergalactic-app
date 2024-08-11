import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  uid: string;
  email: string;
  displayName?: string;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: "",
    email: "",
    displayName: "",
  } as User,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
  },
});

export const { setUser, setDisplayName } = userSlice.actions;

export default userSlice.reducer;
