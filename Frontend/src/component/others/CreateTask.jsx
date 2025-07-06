import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  createTask,
  getAllEmployees,
} from "../../services/operations/adminApi";

const CreateTask = () => {
  const { user } = useUser();

  const [title, setTaskTitle] = useState("");
  const [description, setTaskDesc] = useState("");
  const [assignedDate, setTaskDate] = useState("");
  const [category, setCategory] = useState("");
  const [empId, setEmpId] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getAllEmployees(user.token);
        setEmployees(res);
      } catch (error) {}
    };
    fetchEmployees();
  }, [user.token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      assignedDate,
      category,
      status: "new",
      employeeId: empId,
    };
    try {
      await createTask(user.token, newTask);
      // setTaskTitle("");
      // setTaskDesc("");
      // setTaskDate("");
      // setCategory("");
      // setEmpId("");
    } catch (error) {}
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-7 rounded">
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2 space-y-4">
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={title}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-white text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400"
              type="text"
              placeholder="Make"
              required
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={assignedDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-white text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400"
              type="date"
              required
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
            <select
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              className="text-white bg-[#1c1c1c] text-sm py-1 px-2 w-4/5 rounded outline-none    border border-gray-400"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-white text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400"
              type="text"
              placeholder="design, dev, etc"
              required
            />
          </div>
        </div>

        <div className="w-1/2 pl-4">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={description}
            onChange={(e) => setTaskDesc(e.target.value)}
            className="text-white w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border border-gray-400"
            placeholder="Task details..."
            required
          ></textarea>

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 py-3 px-5 rounded text-sm mt-4 w-full text-white"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
