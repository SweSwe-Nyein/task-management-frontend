import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
})

export const registerSchema = Yup.object().shape({
  full_name: Yup.string().required('Full Name is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
})

export const createTaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  assignee: Yup.string().required('Assignee is required'),
  status: Yup.string().required('Status is required'),
  due_date: Yup.string().required('Due Date is required'),
})