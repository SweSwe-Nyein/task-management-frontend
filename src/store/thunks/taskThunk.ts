import { createAsyncThunk } from '@reduxjs/toolkit';
import { CountList, Task, TaskBody, TaskDelete, taskError, TaskList, TaskParams } from '../../types/task';
import taskService from '../../services/taskService';

export const fetchCounts = createAsyncThunk<
  CountList,
  void,
{
  rejectValue: taskError;
}
>(
  'auth/fetchCounts',
  async (_, thunkAPI) => {
    try {
      const res = await taskService.getCounts();
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

export const fetchTaskList = createAsyncThunk<
  TaskList,
  TaskParams,
{
  rejectValue: taskError;
}
>(
  'auth/fetchTaskList',
  async (params: TaskParams, thunkAPI) => {
    try {
      const res = await taskService.getTaskList(params);
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

export const fetchCreateTask = createAsyncThunk<
  Task,
  TaskBody,
{
  rejectValue: taskError;
}
>(
  'auth/fetchCreateTask',
  async (body: TaskBody, thunkAPI) => {
    try {
      const res = await taskService.createTask(body);
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
export const fetchTaskDetail = createAsyncThunk<
  Task,
  string,
{
  rejectValue: taskError;
}
>(
  'auth/fetchTaskDetail',
  async (id: string, thunkAPI) => {
    try {
      const res = await taskService.getTaskDetail(id);
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
export const fetchEditTask = createAsyncThunk<
  Task,
  {id: string, body: TaskBody},
{
rejectValue: taskError;
}
>(
'auth/fetchEditTask',
async ({id, body}: {id: string, body: TaskBody}, thunkAPI) => {
  try {
    const res = await taskService.editTask(id, body);
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

export const fetchDeleteTask = createAsyncThunk<
  TaskDelete,
  string,
{
  rejectValue: taskError;
}
>(
  'auth/fetchDeleteTask',
  async (id: string, thunkAPI) => {
    try {
      const res = await taskService.deleteTask(id);
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

export const fetchMarkAsDoneTask = createAsyncThunk<
  void,
  string,
{
  rejectValue: taskError;
}
>(
  'auth/fetchMarkAsDoneTask',
  async (id: string, thunkAPI) => {
    try {
      const res = await taskService.markAsDoneTask(id);
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
