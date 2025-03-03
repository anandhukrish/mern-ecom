import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Login, Register, User } from "../../types/user.types";

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: Register) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      payload,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const login = createAsyncThunk("auth/login", async (payload: Login) => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/login",
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.user = null;
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.user = null;
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null;
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
