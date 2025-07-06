import React from "react";
import "../../App.css";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";

const TaskLists = ({ data, newTask, completed, active, failed }) => {
  return (
    <div
      id="tasklist"
      className="h-[55%] flex items-center justify-start gap-5 flex-nowrap w-full py-5 rounded-xl"
    >
      {data.map((e, idx) => {
        if (e.status === "active") {
          return <AcceptTask key={idx} data={e} active={active} />;
        } else if (e.status === "new") {
          return <NewTask key={idx} data={e} newTask={newTask} />;
        } else if (e.status === "completed") {
          return <CompleteTask key={idx} data={e} completed={completed} />;
        } else if (e.status === "failed") {
          return <FailedTask key={idx} data={e} failed={failed} />;
        }
        return null; // in case none match
      })}
    </div>
  );
};

export default TaskLists;
