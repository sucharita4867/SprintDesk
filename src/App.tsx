import { useState } from "react";
import type { Task } from "./types/Task";
import Column from "./components/Column/Column";
import { useBoardStore } from "./store/BoardStore";
import TaskPanel from "./components/TaskPanel/TaskPanel";

function App() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const tasks = useBoardStore((state) => state.tasks);

  // search state
  const [searchText, setSearchText] = useState("");
  // priorityFilter
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const backlogTasks = filteredTasks.filter(
    (task) => task.column === "backlog",
  );

  const inProgressTasks = filteredTasks.filter(
    (task) => task.column === "inProgress",
  );

  const doneTasks = filteredTasks.filter((task) => task.column === "done");

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    console.log("Selected Task:", task);
  };

  return (
    <>
      {/* search  */}
      <input
        type="text"
        style={{
          width: "50%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
        placeholder="Search tasks title..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {/* priorityFilter */}
      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
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
  );
}

export default App;
