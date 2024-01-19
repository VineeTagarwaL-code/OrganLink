import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    token: string | null
}

const storedToken = localStorage.getItem("OrganDonToken");
const initialState: initialStateType = {
    token: storedToken ? JSON.parse(storedToken) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      setToken(state, value) {
        state.token = value.payload;
      },
    }
  });
  
  export const { setToken } = authSlice.actions;
  export default authSlice.reducer;