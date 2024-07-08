import { TaskBody, TaskParams } from '../types/task';
import api from './api';

const getCounts = async () => {
  return api
    .get('/tasks/counts')
    .then(response => response.data);
}

const getTaskList = async (params: TaskParams) => {
  return api
    .get('/tasks', {params})
    .then(response => response.data);
}

const createTask = async (body: TaskBody) => {
  return api
    .post('/tasks', body)
    .then(response => response.data);
}

const getTaskDetail = async (id: string) => {
  return api
    .get(`/tasks/${id}`)
    .then(response => response.data);
}

const editTask = async (id: string, body: TaskBody) => {
  return api
    .patch(`/tasks/${id}`, body)
    .then(response => response.data);
}

const deleteTask = async (id: string) => {
  return api
    .delete(`/tasks/${id}`)
    .then(response => response.data);
}

const markAsDoneTask = async (id: string) => {
  return api
    .patch(`/tasks/${id}/mark-as-done`)
    .then(response => response.data);
}

export default {
  getCounts,
  getTaskList,
  createTask,
  getTaskDetail,
  editTask,
  deleteTask,
  markAsDoneTask
}