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

  const [assigneeFilter, setAssigneeFilter] = useState("all");

  const [tagFilter, setTagFilter] = useState("all");

  const [sortBy, setSortBy] = useState("default");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    const matchesAssignee =
      assigneeFilter === "all" || task.assigneeId === assigneeFilter;

    const matchesTag = tagFilter === "all" || task.tagId === tagFilter;

    return matchesSearch && matchesPriority && matchesAssignee && matchesTag;
  });

  const sortedTasks = [...filteredTasks];

  if (sortBy === "priority") {
    const priorityOrder = {
      high: 3,
      medium: 2,
      low: 1,
    };
    // console.log(sortedTasks.map((task) => `${task.title} - ${task.priority}`));

    sortedTasks.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
    );
  }

  // due date sort
  else if (sortBy === "dueDate") {
    sortedTasks.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;

      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;

      return dateA - dateB;
    });
  }

  const backlogTasks = sortedTasks.filter((task) => task.column === "backlog");

  const inProgressTasks = sortedTasks.filter(
    (task) => task.column === "inProgress",
  );

  const doneTasks = sortedTasks.filter((task) => task.column === "done");

  const assignees = useBoardStore((state) => state.assignees);

  const tags = useBoardStore((state) => state.tags);

  // Card Click Handler
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const activeFilterCount =
    (searchText ? 1 : 0) +
    (priorityFilter !== "all" ? 1 : 0) +
    (assigneeFilter !== "all" ? 1 : 0) +
    (tagFilter !== "all" ? 1 : 0);

  // Clear Filters
  const handleClearFilters = () => {
    setSearchText("");
    setPriorityFilter("all");
    setAssigneeFilter("all");
    setTagFilter("all");
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

        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
        >
          <option value="all">All Assignees</option>
          {assignees.map((assignee) => (
            <option key={assignee.id} value={assignee.id}>
              {assignee.name}
            </option>
          ))}
        </select>

        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        >
          <option value="all">All Tags</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        {/* sort */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>

          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>

        <button onClick={handleClearFilters}>Clear Filters</button>
        <span>Active Filters: {activeFilterCount}</span>
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
