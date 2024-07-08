import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout, fetchProfile } from "../store/thunks/authThunk";

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {isAuthenticated} = useSelector((state: RootState) => state.auth)
  
  useEffect(() => {
    dispatch(fetchProfile());
  }, [])

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  const handleAddNew = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    !isAuthenticated && navigate('/login');
  }, [isAuthenticated]);

  return (
    <header className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <span className="ml-2 md:text-xl text-md font-semibold">Task<br/> Management</span>
      </div>
      <div className="space-x-4">
        <button
          onClick={handleAddNew}
          className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
        <button
          onClick={handleLogout}
          className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      {isDialogOpen && (
        <CreateTask
          onClose={handleCloseDialog}
        />
      )}
    </header>
  );
};

export default Header;
