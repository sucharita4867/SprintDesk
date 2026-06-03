import { useState } from "react";
import type { Task } from "./types/Task";
import Column from "./components/Column/Column";
import { useBoardStore } from "./store/BoardStore";
import TaskPanel from "./components/TaskPanel/TaskPanel";

function App() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const tasks = useBoardStore((state) => state.tasks);

  const backlogTasks = tasks.filter((task) => task.column === "backlog");
  const inProgressTasks = tasks.filter((task) => task.column === "inProgress");
  const doneTasks = tasks.filter((task) => task.column === "done");

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    console.log("Selected Task:", task);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Column
          title="Backlog"
          tasks={backlogTasks}
          columnType="backlog"
          onTaskClick={handleTaskClick}
        />

        <Column
          title="In Progress"
          tasks={inProgressTasks}
          columnType="inProgress"
          onTaskClick={handleTaskClick}
        />

        <Column
          title="Done"
          tasks={doneTasks}
          columnType="done"
          onTaskClick={handleTaskClick}
        />
      </div>

      <TaskPanel task={selectedTask} />
    </>
  )
}

export default App;
