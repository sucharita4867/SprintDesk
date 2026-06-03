import { useBoardStore } from "../../store/BoardStore";
import type { Task } from "../../types/Task";
import TaskCard from "../TaskCard/TaskCard";

interface ColumnProps {
  title: string;
  tasks: Task[];
  columnType: Task["column"];
  onTaskClick: (task: Task) => void;
}

function Column({ title, tasks, columnType, onTaskClick }: ColumnProps) {
  const addTask = useBoardStore((state) => state.addTask);

  const moveTask = useBoardStore((state) => state.moveTask);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData("taskId");

        moveTask(taskId, columnType);
      }}
      style={{
        width: "250px",
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
        <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
      ))}
    </div>
  );
}

export default Column;
