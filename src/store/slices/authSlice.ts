import { createSlice } from "@reduxjs/toolkit"
import { authState } from "../../types/auth"
import { fetchLogin, fetchLogout, fetchProfile, fetchRegister, fetchUserList } from "../thunks/authThunk"

const initialState: authState = {
  loading: false,
  authErrors: undefined,
  isAuthenticated: true,
  userList: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialise: () => {
      return initialState;
    },
    resetErrors: (state) => {
      state.authErrors = undefined;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = !!action.payload;
    }
  },
  extraReducers: builder => {
    builder
      // fetchLogin
      .addCase(fetchLogin.pending, (state, action) => {
        state.loading = true;
        authSlice.caseReducers.resetErrors(state);
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        const accessToken = action.payload.token.access_token;
        state.isAuthenticated = true;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.authErrors = action.payload;
      })
      // fetchRegister
      .addCase(fetchRegister.pending, (state, action) => {
        state.loading = true;
        authSlice.caseReducers.resetErrors(state);
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false;
        const accessToken = action.payload.access_token;
        state.isAuthenticated = true;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loading = false;
        state.authErrors = action.payload;
      })
      // fetchLogout
      .addCase(fetchLogout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      // fetchProfile
      .addCase(fetchProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      // fetchUserList
      .addCase(fetchUserList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
      })
  }
})

export const {initialise, resetErrors, setIsAuthenticated} = authSlice.actions;

const {reducer: authReducer} = authSlice;
export default authReducer;