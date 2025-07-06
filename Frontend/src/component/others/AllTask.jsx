import { useEffect, useState } from "react";
import "../../App.css";
import { getAllEmployees } from "../../services/operations/adminApi";
import { useUser } from "../../context/UserContext";

const AllTask = () => {
  const { user } = useUser();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await getAllEmployees(user.token);
      setEmployees(employees);
    };
    getEmployees();
  }, []);

  const employeesWithTaskCounts = employees.map((e) => {
    const taskCount = {
      newTask: 0,
      active: 0,
      completed: 0,
      failed: 0,
    };

    e.tasks?.forEach((task) => {
      if (task.status === "new") taskCount.newTask += 1;
      else if (task.status === "active") taskCount.active += 1;
      else if (task.status === "completed") taskCount.completed += 1;
      else if (task.status === "failed") taskCount.failed += 1;
    });

    return { ...e, taskCount };
  });
  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-5">
      <div className="text-grey bg-red-400 mb-2 py-2 px-4 flex justify-between rounded">
        <h2 className="text-lg font-medium w-1/5">Name</h2>
        <h3 className="text-lg font-medium w-1/5">New Task</h3>
        <h5 className="text-lg font-medium w-1/5">Accepted</h5>
        <h5 className="text-lg font-medium w-1/5">Completed</h5>
        <h5 className="text-lg font-medium w-1/5">Failed</h5>
      </div>

      <div className="overflow-y-scroll overflow-x-hidden custom-scrollbar max-h-[200px]">
        {employeesWithTaskCounts.length > 0 ? (
          employeesWithTaskCounts.map((e) => (
            <div
              key={e._id}
              className="border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded text-white"
            >
              <h2 className="text-lg font-medium w-1/5">{e.firstName}</h2>
              <h5 className="text-lg font-medium w-1/5 text-blue-200">
                {e.taskCount?.newTask || 0}
              </h5>
              <h5 className="text-lg font-medium w-1/5 text-yellow-300">
                {e.taskCount?.active || 0}
              </h5>
              <h5 className="text-lg font-medium w-1/5 text-green-200">
                {e.taskCount?.completed || 0}
              </h5>
              <h5 className="text-lg font-medium w-1/5 text-red-300">
                {e.taskCount?.failed || 0}
              </h5>
            </div>
          ))
        ) : (
          <div className="text-white">No employees found</div>
        )}
      </div>
    </div>
  );
};

export default AllTask;
