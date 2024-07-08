export type taskState = {
  loading: boolean;
  detailLoading: boolean;
  success: boolean;
  taskErrors: taskError | undefined;
  counts: CountList;
  taskList: TaskList;
  taskDetail: Task;
}

export type taskError = {
  status: number;
  message: string;
  errors: string[];
}

export type CountList = {
  todo: number;
  in_progress: number;
  done: number;
}

export type TaskParams = {
  status: string;
  page: number;
  limit?: number;
}

export type TaskList = {
  tasks: Task[];
  total: number;
}

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskBody = {
  title: string;
  description: string;
  status: string;
  due_date: string;
}

export type TaskDelete = {
  acknowledged: boolean;
  deletedCount: number;
}