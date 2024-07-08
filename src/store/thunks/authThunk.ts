import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { authError, LoginBody, LoginResponse, LogoutResponse, RegisterBody, RegisterResponse } from '../../types/auth';

export const fetchLogin = createAsyncThunk<
  LoginResponse,
  LoginBody,
  {
    rejectValue: authError;
  }
>(
  'auth/fetchLogin',
  async (body: LoginBody, thunkAPI) => {
    try {
      const res = await authService.login(body);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      });
    }
  }
);

export const fetchRegister = createAsyncThunk<
  RegisterResponse,
  RegisterBody,
  {
    rejectValue: authError;
  }
>(
  'auth/fetchRegister',
  async (body: RegisterBody, thunkAPI) => {
    try {
      const res = await authService.regsiter(body);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      });
    }
  }
);

export const fetchLogout = createAsyncThunk<
  LogoutResponse,
  void,
  {
    rejectValue: authError;
  }
>(
  'auth/fetchLogout',
  async (_, thunkAPI) => {
    try {
      const res = await authService.logout();
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      });
    }
  }
);

export const fetchProfile = createAsyncThunk<
LogoutResponse,
void,
{
  rejectValue: authError;
}
>(
'auth/fetchProfile',
async (_, thunkAPI) => {
  try {
    const res = await authService.getProfile();
    return res;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({
      status: err.response.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    });
  }
}
);