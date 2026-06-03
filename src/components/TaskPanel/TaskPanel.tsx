import { useState } from "react";
import { useBoardStore } from "../../store/BoardStore";
import type { Task } from "../../types/Task";

interface TaskPanelProps {
  task: Task | null;
}

function TaskPanel({ task }: TaskPanelProps) {
  const updateTask = useBoardStore(
    (state) => state.updateTask
  );
const [title, setTitle] = useState(task?.title || "");
const [description, setDescription] = useState(
  task?.description || ""
);
const [priority, setPriority] = useState(
  task?.priority || "low"
);

if (!task) return null;

  const handleSave = () => {
    updateTask(task.id, {
      title,
      description,
      priority,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "350px",
        height: "100vh",
        background: "white",
        borderLeft: "1px solid #ccc",
        padding: "20px",
      }}
    >
      <h2>Task Details</h2>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          style={{
            width: "100%",
            minHeight: "120px",
            padding: "8px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        />
      </div>

      <div>
        <label>Priority</label>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value as
                | "low"
                | "medium"
                | "high"
            )
          }
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default TaskPanel;