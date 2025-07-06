import React from "react";
import { useUser } from "../../context/UserContext";
import { updateTaskStatus } from "../../services/operations/employeeApi";

const AcceptTask = ({ data }) => {
  const { user } = useUser();

  const markCompleted = async () => {
    const res = await updateTaskStatus(user.token, data._id, "completed");
  };

  const markFailed = async () => {
    const res = await updateTaskStatus(user.token, data._id, "failed");
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-red-300 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-sm bg-red-600 px-3 py-1 rounded">
          {data.category}
        </h3>
        <h4 className="text-sm">{data.assignedDate}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.title}</h2>
      <p className="text-sm mt-2">{data.description}</p>
      <div className="flex justify-between mt-4">
        <button
          className="bg-green-500 py-1 px-2 text-sm"
          onClick={markCompleted}
        >
          Mark as Completed
        </button>
        <button className="bg-red-500 py-1 px-2 text-sm" onClick={markFailed}>
          Mark as Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
