import { createSlice } from "@reduxjs/toolkit"
import { CountList, Task, TaskList, taskState } from "../../types/task"
import { fetchCounts, fetchCreateTask, fetchDeleteTask, fetchEditTask, fetchMarkAsDoneTask, fetchTaskDetail, fetchTaskList } from "../thunks/taskThunk";

const initialState: taskState = {
  loading: false,
  detailLoading: false,
  success: false,
  taskErrors: undefined,
  counts: {} as CountList,
  taskList: {} as TaskList,
  taskDetail: {} as Task,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    initialise: () => {
      return initialState;
    },
    resetErrors: (state) => {
      state.taskErrors = undefined;
    },
  },
  extraReducers: builder => {
    builder
      // fetchCounts
      .addCase(fetchCounts.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.counts = action.payload;
      })
      .addCase(fetchCounts.rejected, (state, action) => {
        state.loading = false;
        state.taskErrors = action.payload;
      })
      // fetchTaskList
      .addCase(fetchTaskList.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchTaskList.fulfilled, (state, action) => {
        state.loading = false;
        state.taskList = action.payload;
      })
      .addCase(fetchTaskList.rejected, (state, action) => {
        state.loading = false;
        state.taskErrors = action.payload;
      })
      // fetchCreateTask
      .addCase(fetchCreateTask.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchCreateTask.rejected, (state, action) => {
        state.loading = false;
        state.taskErrors = action.payload;
      })
      // fetchTaskDetail
      .addCase(fetchTaskDetail.pending, (state, action) => {
        state.detailLoading = true;
      })
      .addCase(fetchTaskDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.taskDetail = action.payload;
      })
      .addCase(fetchTaskDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.taskErrors = action.payload;
      })
      // fetchEditTask
      .addCase(fetchEditTask.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchEditTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.taskDetail = {} as Task;
      })
      .addCase(fetchEditTask.rejected, (state, action) => {
        state.loading = false;
        state.taskErrors = action.payload;
      })
      // fetchDeleteTask
      .addCase(fetchDeleteTask.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchDeleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchDeleteTask.rejected, (state, action) => {
        state.loading = false;
        state.taskErrors = action.payload;
      })
      // fetchMarkAsDoneTask
      .addCase(fetchMarkAsDoneTask.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchMarkAsDoneTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchMarkAsDoneTask.rejected, (state, action) => {
        state.loading = false;
        state.taskErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors} = taskSlice.actions;

const {reducer: taskReducer} = taskSlice;
export default taskReducer;