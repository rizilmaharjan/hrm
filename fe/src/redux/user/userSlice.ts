import { createSlice } from "@reduxjs/toolkit";

type TCurrentUser = {
  USER_CD?: string;
  EMPLOYEE_CD?: string;
  role: string;
};
const initialState = {
  currentUser: null as TCurrentUser | null,
  loading: false,
  error: false,
  errMsg: "",
};

// user slice

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
      state.error = false;
      state.errMsg = "";
    },

    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      state.errMsg = "";
    },

    logInFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMsg = action.payload;
      state.currentUser = null;
    },

    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.errMsg = "";
    },
  },
});

export const { logInStart, logInSuccess, logInFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
