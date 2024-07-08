import { useEffect } from "react";
import { createTaskSchema } from "../validation/schema";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchEditTask, fetchTaskDetail } from "../store/thunks/taskThunk";
import { formatDate } from "../utils/common";

interface DialogBoxProps {
  id: string;
  onClose: () => void;
}

const EditTask: React.FC<DialogBoxProps> = ({ id, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {taskErrors, success, taskDetail} = useSelector((state: RootState) => state.task)
  
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "",
      due_date: "",
    },
    validationSchema: createTaskSchema,
    onSubmit: (values) => {
      dispatch(fetchEditTask({
        id, 
        body: values
      }));
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    dispatch(fetchTaskDetail(id));
  }, [])
  useEffect(() => {
    if(Object.keys(taskDetail).length != 0) {
      formik.setValues({
        title: taskDetail.title,
        description: taskDetail.description,
        status: taskDetail.status,
        due_date: formatDate(taskDetail.due_date),
      })
    }
  }, [taskDetail])
  useEffect(() => {
    if(success) {
      onClose();
    }
  }, [success])
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-black bg-opacity-50 p-3">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>
        {taskErrors && taskErrors.message ? (
          <div className="text-red-600 text-xs mb-1">{taskErrors.message}</div>
        ) : null}
        <div className="mb-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                type="text"
                placeholder="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-red-600 text-xs mt-1">{formik.errors.title}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                rows={3}
                placeholder="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-600 text-xs mt-1">{formik.errors.description}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded bg-white"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                required
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              {formik.touched.status && formik.errors.status ? (
                <div className="text-red-600 text-xs mt-1">{formik.errors.status}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                id="due_date"
                value={formik.values.due_date}
                onChange={formik.handleChange}
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded bg-white"
              />
              {formik.touched.due_date && formik.errors.due_date ? (
                <div className="text-red-600 text-xs mt-1">{formik.errors.due_date}</div>
              ) : null}
            </div>
            <div className="flex justify-between mt-5">
              <button onClick={onClose} className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Close
              </button>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default EditTask;