import {  Typography, Card, Button, Chip } from "@mui/material";
import { useBoardStore } from "../../store/BoardStore";
import type { Task } from "../../types/Task";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

function TaskCard({ task, onClick }: TaskCardProps) {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const priorityConfig = {
    high: { color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
    medium: { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
    low: { color: "#10b981", bg: "rgba(16, 185, 129, 0.15)" }
  };

  const currentPriority = priorityConfig[task.priority] || priorityConfig.low;

  return (
    <Card
      draggable
      onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
      onClick={onClick}
      sx={{
        bgcolor: "#252632",
        border: "1px solid #2b2d3d",
        borderRadius: 2.5,
        p: 2,
        cursor: "grab",
        boxShadow: "none",
        transition: "border-color 0.2s, transform 0.1s",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        "&:hover": { borderColor: "#475569" },
        "&:active": { cursor: "grabbing" }
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
        <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 600, lineHeight: 1.4 }}>
          {task.title}
        </Typography>
        <Chip 
          label={task.priority} 
          size="small" 
          sx={{ 
            color: currentPriority.color, 
            bgcolor: currentPriority.bg, 
            fontSize: "11px", 
            fontWeight: 700,
            textTransform: "uppercase",
            borderRadius: 1.5,
            height: "22px"
          }} 
        />
      </div>

      {task.description && (
        <Typography sx={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.5 }}>
          {task.description}
        </Typography>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "12px",
          borderTop: "1px solid #2b2d3d",
          marginTop: "4px"
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <Typography sx={{ fontSize: "12px", color: "#cbd5e1" }}>
            {task.dueDate || "No Date"}
          </Typography>
        </div>

        <Button
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          sx={{ 
            color: "#ef4444", 
            fontSize: "12px", 
            textTransform: "none",
            minWidth: "auto",
            p: 0,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            "&:hover": { bgcolor: "transparent", color: "#f87171" }
          }}
        >
          {/* SVG Trash Icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default TaskCard;