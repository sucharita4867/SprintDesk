// import { useBoardStore } from "./store/boardStore";
import Column from "./components/Column/Column";
import { useBoardStore } from "./store/BoardStore";

function App() {
  const tasks = useBoardStore((state) => state.tasks);

  const backlogTasks = tasks.filter((task) => task.column === "backlog");

  const inProgressTasks = tasks.filter((task) => task.column === "inProgress");

  const doneTasks = tasks.filter((task) => task.column === "done");

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Column title="Backlog" tasks={backlogTasks} columnType="backlog" />
      <Column
        title="In Progress"
        tasks={inProgressTasks}
        columnType="inProgress"
      />

      <Column title="Done" tasks={doneTasks} columnType="done" />
    </div>
  );
}

export default App;
