import { Box, Typography, Card, Button, Stack, Chip } from "@mui/material";
import { useBoardStore } from "../../store/BoardStore";
import type { Task } from "../../types/Task";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

function TaskCard({ task, onClick }: TaskCardProps) {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const priorityConfig = {
    high: { color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
    medium: { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
    low: { color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" }
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
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
        <Typography sx={{ color: "#fff", fontSize: "14px", fontWeight: 600, lineHeight: 1.4 }}>
          {task.title}
        </Typography>
        <Chip 
          label={task.priority} 
          size="small" 
          sx={{ 
            color: currentPriority.color, 
            bgcolor: currentPriority.bg, 
            fontSize: "10px", 
            fontWeight: 700,
            textTransform: "uppercase",
            borderRadius: 1.5,
            height: "20px"
          }} 
        />
      </Stack>

      {task.description && (
        <Typography sx={{ color: "#94a3b8", fontSize: "12px", lineHeight: 1.5 }}>
          {task.description}
        </Typography>
      )}

      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ pt: 1.5, borderTop: "1px solid #2b2d3d", mt: 0.5 }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "#64748b" }}>
          {/* Custom Calendar Icon Path without package dependency */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <Typography sx={{ fontSize: "11px", color: "#cbd5e1" }}>
            {task.dueDate || "No Date"}
          </Typography>
        </Stack>

        <Button
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          sx={{ 
            color: "#ef4444", 
            fontSize: "11px", 
            textTransform: "none",
            minWidth: "auto",
            p: 0,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            "&:hover": { bgcolor: "transparent", color: "#f87171" }
          }}
        >
          {/* Custom Trash Icon Path */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Delete
        </Button>
      </Stack>
    </Card>
  );
}

export default TaskCard;