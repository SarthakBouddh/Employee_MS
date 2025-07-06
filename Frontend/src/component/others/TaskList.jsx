import React, { useEffect, useState } from "react";
import "../../App.css";
import TaskLists from "../TaskList/TaskLists";
import { getTasksByStatus } from "../../services/operations/employeeApi";
import { useUser } from "../../context/UserContext";

const TaskList = () => {
  const { user } = useUser();
  const [newTask, setNewTask] = useState(true);
  const [completed, setComplete] = useState(true);
  const [active, setActive] = useState(true);
  const [failed, setFailed] = useState(true);
  const [data, setData] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const res = await getTasksByStatus(user.token, "all");
      setData(res.tasks);
      setAllTasks(res.tasks || []);
    };
    getTasks();
  }, []);

  // ✅ Task count per status
  const totalTaskCount = (allTasks || []).reduce(
    (acc, task) => {
      if (task.status === "new") acc.new += 1;
      else if (task.status === "active") acc.active += 1;
      else if (task.status === "completed") acc.completed += 1;
      else if (task.status === "failed") acc.failed += 1;
      return acc;
    },
    { new: 0, active: 0, completed: 0, failed: 0 }
  );

  // ✅ Handlers to toggle filters
  const handleNewTask = () => {
    const filtered = allTasks.filter((task) => task.status === "new");
    setData(filtered);
    setNewTask(true);
    setActive(false);
    setFailed(false);
    setComplete(false);
  };

  const handleComplete = () => {
    const filtered = allTasks.filter((task) => task.status === "completed");
    setData(filtered);
    setNewTask(false);
    setActive(false);
    setFailed(false);
    setComplete(true);
  };

  const handleActive = () => {
    const filtered = allTasks.filter((task) => task.status === "active");
    setData(filtered);
    setNewTask(false);
    setActive(true);
    setFailed(false);
    setComplete(false);
  };

  const handleFailed = () => {
    const filtered = allTasks.filter((task) => task.status === "failed");
    setData(filtered);
    setNewTask(false);
    setActive(false);
    setFailed(true);
    setComplete(false);
  };

  const handleShowAll = () => {
    setData(allTasks);
    setNewTask(true);
    setActive(true);
    setFailed(true);
    setComplete(true);
  };

  return (
    <>
      <div className="flex mt-10 justify-between gap-2 screen flex-wrap">
        <div
          className="rounded-xl w-[22%] py-6 px-9 bg-red-400"
          onClick={handleNewTask}
          style={{ cursor: "pointer" }}
        >
          <h2 className="text-3xl font-semibold">{totalTaskCount.new}</h2>
          <h3 className="text-xl font-medium">New Task</h3>
        </div>
        <div
          className="rounded-xl w-[22%] py-6 px-9 bg-blue-400"
          onClick={handleComplete}
          style={{ cursor: "pointer" }}
        >
          <h2 className="text-3xl font-semibold">{totalTaskCount.completed}</h2>
          <h3 className="text-xl font-medium">Completed</h3>
        </div>
        <div
          className="rounded-xl w-[22%] py-6 px-9 bg-green-400"
          onClick={handleActive}
          style={{ cursor: "pointer" }}
        >
          <h2 className="text-3xl font-semibold">{totalTaskCount.active}</h2>
          <h3 className="text-xl font-medium">Active</h3>
        </div>
        <div
          className="rounded-xl w-[22%] py-6 px-9 bg-yellow-400"
          onClick={handleFailed}
          style={{ cursor: "pointer" }}
        >
          <h2 className="text-3xl font-semibold">{totalTaskCount.failed}</h2>
          <h3 className="text-xl font-medium">Failed</h3>
        </div>
      </div>

      <div
        className="flex justify-end px-4"
        style={{ marginTop: "1vh", marginBottom: "1vh" }}
      >
        <button
          type="button"
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          onClick={handleShowAll}
        >
          Show All
        </button>
      </div>

      <TaskLists
        data={data}
        newTask={newTask}
        completed={completed}
        active={active}
        failed={failed}
      />
    </>
  );
};

export default TaskList;
