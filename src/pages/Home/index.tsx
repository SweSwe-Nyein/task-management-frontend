import { useEffect } from "react";
import { Tab, Tabs } from "../../components/Tabs";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCounts } from "../../store/thunks/taskThunk";
import { fetchUserList } from "../../store/thunks/authThunk";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {counts, success} = useSelector((state: RootState) => state.task)
  useEffect(() => {
    dispatch(fetchCounts());
    dispatch(fetchUserList());
  }, [success])
  return (
    <div>
      <Header />
      <Tabs>
        <Tab label="Todo" value="todo" count={counts.todo}></Tab>
        <Tab label="In Progress" value="in_progress" count={counts.in_progress}></Tab>
        <Tab label="Done" value="done" count={counts.done}></Tab>
      </Tabs>
    </div>
  )
}
export default Home;