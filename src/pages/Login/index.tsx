import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { loginSchema } from "../../validation/schema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchLogin } from "../../store/thunks/authThunk";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {authErrors, isAuthenticated} = useSelector((state: RootState) => state.auth)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(fetchLogin(values))
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    };
  }, [isAuthenticated]);

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm p-5 border-[1px] rounded-md">
        <div className="text-center md:text-left mb-5">
          <label className="text-3xl">Login</label>
        </div>
        {authErrors && authErrors.message ? (
          <div className="text-red-600 text-xs mb-1">{authErrors.message}</div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600 text-xs mt-1">{formik.errors.email}</div>
          ) : null}
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600 text-xs mt-1">{formik.errors.password}</div>
          ) : null}
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?
          <Link 
            to="/register"
            className="text-blue-600 hover:underline hover:underline-offset-4 ms-2"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  )
}
export default Login;