import { useState } from "react";
import Column from "./components/Column/Column";
import TaskPanel from "./components/TaskPanel/TaskPanel";
import { useBoardStore } from "./store/BoardStore";
import type { Task } from "./types/Task";

function App() {
  const tasks = useBoardStore((state) => state.tasks);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [searchText, setSearchText] = useState("");
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

  // Card Click Handler
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSearchText("");
    setPriorityFilter("all");
  };

  return (
    <>
      <div
        style={{
          padding: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
          }}
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>

      {filteredTasks.length === 0 && (
        <div
          style={{
            padding: "20px",
          }}
        >
          <h2>No tasks match your filters.</h2>
        </div>
      )}

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
