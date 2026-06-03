import { useBoardStore } from "../../store/BoardStore";
import type { Task } from "../../types/Task";
import TaskCard from "../TaskCard/TaskCard";

interface ColumnProps {
  title: string;
  tasks: Task[];
  columnType: Task["column"];
}
function Column({ title, tasks, columnType }: ColumnProps) {
  const addTask = useBoardStore((state) => state.addTask);

  return (
    <div
      style={{
        width: "300px",
        minHeight: "400px",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <h2>
        {title} ({tasks.length})
      </h2>

      <button onClick={() => addTask(columnType)}>Add Task</button>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Column;
