import React from "react";
import { updateTaskStatus } from "../../services/operations/employeeApi";
import { useUser } from "../../context/UserContext";

const NewTask = ({ data, newTask }) => {
  const { user } = useUser();

  const acceptTask = async () => {
    const res = await updateTaskStatus(user.token, data._id, "active");
  };

  return (
    <>
      {newTask ? (
        <div className="flex-shrink-0 h-full w-[300px] p-5 bg-red-300 rounded-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-sm bg-red-600 px-3 py-1 rounded">
              {data.category}
            </h3>
            <h4 className="text-sm">{data.assignedDate}</h4>
          </div>
          <h2 className="mt-5 text-2xl font-semibold ">{data.title}</h2>
          <p className="text-sm mt-2">{data.description}</p>
          <div className="mt-6">
            <button
              onClick={acceptTask}
              className="bg-blue-500 rounded font-medium py-1 px-2 text-xs"
            >
              Accept Task
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NewTask;
