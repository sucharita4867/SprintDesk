import { useBoardStore } from "../../store/BoardStore";
import type { Task } from "../../types/Task";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

function TaskCard({ task, onClick }: TaskCardProps) {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px",
        cursor: "grab",
      }}
    >
      <h4>{task.title}</h4>
      <p>Priority: {task.priority}</p>
      <h4>{task.description}</h4>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
      >
        Delete Task
      </button>
    </div>
  );
}

export default TaskCard;
