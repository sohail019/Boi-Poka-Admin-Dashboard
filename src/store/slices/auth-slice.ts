import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userType: "admin" | "superadmin" | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  userType: localStorage.getItem("userType") as "admin" | "superadmin" | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; userType: "admin" | "superadmin" }>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userType = action.payload.userType;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userType", action.payload.userType);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userType = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userType");  
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
