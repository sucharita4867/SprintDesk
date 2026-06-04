import { Box, Typography, Button, Stack } from "@mui/material";
import { useBoardStore } from "../../store/BoardStore";
import type { Task } from "../../types/Task";
import TaskCard from "../TaskCard/TaskCard";

interface ColumnProps {
  title: string;
  tasks: Task[];
  columnType: Task["column"];
  onTaskClick: (task: Task) => void;
  indicatorColor: string;
}

function Column({
  title,
  tasks,
  columnType,
  onTaskClick,
  indicatorColor,
}: ColumnProps) {
  const addTask = useBoardStore((state) => state.addTask);
  const moveTask = useBoardStore((state) => state.moveTask);

  return (
    <Box
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData("taskId");
        moveTask(taskId, columnType);
      }}
      sx={{
        flex: 1,
        minWidth: "250px",
        minHeight: "500px",
        bgcolor: "#1e1f29",
        p: 2.5,
        borderRadius: 3,
        borderTop: `4px solid ${indicatorColor || "#cbd5e1"}`,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>
          {title}{" "}
          <Box
            component="span"
            sx={{ color: "#64748b", fontSize: "14px", ml: 0.5 }}
          >
            ({tasks.length})
          </Box>
        </Typography>

        <Button
          onClick={() => addTask(columnType)}
          size="small"
          variant="text"
          sx={{
            color: "#3b82f6",
            textTransform: "none",
            fontSize: "13px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            padding: "4px 8px",
            "&:hover": { bgcolor: "rgba(59, 130, 246, 0.08)" },
          }}
        >
          {/* SVG Add Plus Icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Task
        </Button>
      </div>

      <Stack spacing={1.5} sx={{ flex: 1, overflowY: "auto" }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Column;
