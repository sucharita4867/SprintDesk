import type { Task } from "../../types/Task";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
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
    </div>
  );
}

export default TaskCard;
