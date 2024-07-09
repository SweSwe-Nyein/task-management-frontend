import React, { useState } from 'react';
import EditTask from './EditTask';
import { Task } from '../types/task';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchDeleteTask, fetchMarkAsDoneTask } from '../store/thunks/taskThunk';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const {success} = useSelector((state: RootState) => state.task)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const DeleteTask = (id: string) => {
    dispatch(fetchDeleteTask(id))
  }

  const MarkAsDone = (id: string) => {
    dispatch(fetchMarkAsDoneTask(id));
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md bg-white mb-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm text-blue-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500 mt-1">Assignee: {task.assignee.full_name}</p>
      {
        task.status === 'done' ?
        <p className={`mt-2 text-sm font-semibold text-green-600`}>Done</p> : 
        task.status === 'todo' ?
        <p className={`mt-2 text-sm font-semibold text-blue-600`}>To Do</p> : 
        task.status === 'in_progress' && 
        <p className={`mt-2 text-sm font-semibold text-yellow-600`}>In Progress</p>
      }
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex text-sm justify-center items-center py-1 px-2 border border-transparent rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => DeleteTask(task._id)}
          className="inline-flex text-sm justify-center items-center py-1 px-2 border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
        {task.status !== 'done' && (
          <button
            onClick={() => MarkAsDone(task._id)}
            className="inline-flex text-sm justify-center items-center py-1 px-2 border border-transparent rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Mark as Done
          </button>
        )}
      </div>
      {isDialogOpen && (
        <EditTask
          id={task._id}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default TaskItem;
