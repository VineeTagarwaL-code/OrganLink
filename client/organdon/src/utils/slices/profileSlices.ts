import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("OrganDonation_User");
const initialState = {
  user: user
    ? JSON.parse(user)
    : null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
  }
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;