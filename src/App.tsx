import { useBoardStore } from "./store/BoardStore";

function App() {
  const tasks = useBoardStore((state) => state.tasks);

  return (
    <div>
      <h1>SprintDesk</h1>

      {tasks.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
    </div>
  );
}

export default App;
