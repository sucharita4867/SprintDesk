import type { Task } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

function Column({ title, tasks }: ColumnProps) {
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

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Column;