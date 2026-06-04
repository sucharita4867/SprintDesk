import { useEffect, useState } from "react";
import { useBoardStore } from "../../store/BoardStore";
import type { Task } from "../../types/Task";

interface TaskPanelProps {
  task: Task | null;
}

function TaskPanel({ task }: TaskPanelProps) {
  const updateTask = useBoardStore((state) => state.updateTask);
  const moveTask = useBoardStore((state) => state.moveTask);

  const assignees = useBoardStore((state) => state.assignees);

  const assignTask = useBoardStore((state) => state.assignTask);

  const tags = useBoardStore((state) => state.tags);

  const assignTag = useBoardStore((state) => state.assignTag);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  const [assigneeId, setAssigneeId] = useState("");
  const [tagId, setTagId] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!task) {
      setTitle("");
      setDescription("");
      setPriority("low");
      setAssigneeId("");
      setDueDate("");
      return;
    }

    setTitle(task.title || "");
    setDescription(task.description || "");
    setPriority(task.priority || "low");
    setAssigneeId(task.assigneeId || "");
    setTagId(task.tagId || "");
    setDueDate(task.dueDate || "");
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    updateTask(task.id, {
      title,
      description,
      priority,
      assigneeId,
      tagId,
      dueDate,
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
        overflowY: "auto",
      }}
    >
      <h2>Task Details</h2>

      {/* Title */}
      <div>
        <label>Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "4px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        />
      </div>

      {/* Description */}
      <div>
        <label>Description</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            minHeight: "50px",
            padding: "4px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        />
      </div>

      {/* Priority */}
      <div>
        <label>Priority</label>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
          style={{
            width: "100%",
            padding: "4px",
            marginTop: "2px",
            marginBottom: "15px",
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label>Due Date</label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            width: "100%",
            padding: "4px",
            marginTop: "2px",
            marginBottom: "15px",
          }}
        />
      </div>

      {/* Move To */}
      <div>
        <label>Move To</label>

        <select
          defaultValue=""
          onChange={(e) => moveTask(task.id, e.target.value as Task["column"])}
          style={{
            width: "100%",
            padding: "4px",
            marginTop: "2px",
            marginBottom: "15px",
          }}
        >
          <option value="" disabled>
            Select Column
          </option>

          {task.column !== "backlog" && (
            <option value="backlog">Backlog</option>
          )}

          {task.column !== "inProgress" && (
            <option value="inProgress">In Progress</option>
          )}

          {task.column !== "done" && <option value="done">Done</option>}
        </select>
      </div>

      {/* Assignee */}
      <div>
        <label>Assignee</label>

        <select
          value={assigneeId}
          onChange={(e) => {
            setAssigneeId(e.target.value);

            assignTask(task.id, e.target.value);
          }}
          style={{
            width: "100%",
            padding: "2px",
            marginTop: "2px",
            marginBottom: "15px",
          }}
        >
          <option value="">Unassigned</option>

          {assignees.map((assignee) => (
            <option key={assignee.id} value={assignee.id}>
              {assignee.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Tag</label>

        <select
          value={tagId}
          onChange={(e) => {
            setTagId(e.target.value);

            assignTag(task.id, e.target.value);
          }}
          style={{
            width: "100%",
            padding: "2px",
            marginTop: "2px",
            marginBottom: "15px",
          }}
        >
          <option value="">No Tag</option>

          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default TaskPanel;
