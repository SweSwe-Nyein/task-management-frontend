import React, { ReactElement, useState, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchTaskList } from '../store/thunks/taskThunk';
import Pagination from './Pagination';
import TaskItem from './TaskItem';
import Loading from './Loading';

interface TabProps {
  label: string;
  value: string;
  count: number;
}

interface TabsProps {
  children: ReactElement<TabProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<string>(children[0].props.label);
  const [activeStatus, setActiveStatus] = useState<string>(children[0].props.value);
  const {loading, taskList, success} = useSelector((state: RootState) => state.task)
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(fetchTaskList({
      status: activeStatus,
      page: currentPage,
    }))
  }, [activeTab, currentPage, success])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, newActiveTab: string, newActiveStatus: string) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
    setActiveStatus(newActiveStatus);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-md mx-auto mt-3">
      <div className="flex border-b border-gray-300">
        {children.map(child => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label ? 'border-b-2 border-purple-500' : ''
            } flex-1 text-gray-700 py-1 text-sm`}
            onClick={e => handleClick(e, child.props.label, child.props.value)}
          >
            {child.props.label}
            <span className="ms-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {child.props.count}
            </span>
          </button>
        ))}
      </div>
      <div className="py-4 mx-3">
        {
          (taskList.total == 0 && !loading) &&
          <p className='text-center my-10'>No Tasks</p>
        }
        {
          loading ? 
          <Loading /> :
          <>
            {children.map(child => {
              if (child.props.label === activeTab) {
                return (
                  <div key={child.props.label}>
                    <div>
                      {Object.keys(taskList).length != 0 &&
                        taskList.tasks.map((task) => (
                          <TaskItem
                            key={task._id}
                            task={task}
                          />
                        ))
                      }
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(taskList.total / 10)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                );
              }
              return null;
            })}
          </>
        }
      </div>
    </div>
  );
};

const Tab: React.FC<TabProps> = () => {
  return (
    <></>
  );
};
export { Tabs, Tab };