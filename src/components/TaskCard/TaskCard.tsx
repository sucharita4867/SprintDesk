import { useBoardStore } from "../../store/BoardStore";
import type { Task } from "../../types/Task";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  return (
    <div
      style={{
        padding: "10px",
        margin: "10px 0",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      <h4>{task.title}</h4>
      <button onClick={() => deleteTask(task.id)}>Delete Task</button>
    </div>
  );
}

export default TaskCard;
