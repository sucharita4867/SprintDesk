import { useEffect, useState } from "react";
import { useBoardStore } from "../../store/BoardStore";
import type { Task } from "../../types/Task";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

interface TaskPanelProps {
  task: Task | null;
  onClose: () => void;
}

function TaskPanel({ task, onClose }: TaskPanelProps) {
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

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!task) {
      setIsOpen(false);
      return;
    }
    setTitle(task.title || "");
    setDescription(task.description || "");
    setPriority(task.priority || "low");
    setAssigneeId(task.assigneeId || "");
    setTagId(task.tagId || "");
    setDueDate(task.dueDate || "");
    setIsOpen(true);
  }, [task]);

  if (!task || !isOpen) return null;

  const handleSave = () => {
    updateTask(task.id, {
      title,
      description,
      priority,
      assigneeId,
      tagId,
      dueDate,
    });
    onClose();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "360px",
        height: "100vh",
        background: "#1e1f29",
        borderLeft: "1px solid #2b2d3d",
        padding: "24px",
        overflowY: "auto",
        boxShadow: "-4px 0 20px rgba(0,0,0,0.4)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
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
        {" "}
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
          Task Details
        </Typography>
        <Button
          onClick={onClose}
          sx={{
            minWidth: "auto",
            color: "#64748b",
            p: 0,
            fontSize: "22px",
            "&:hover": { color: "#ef4444" },
          }}
        >
          &times;
        </Button>
      </div>

      <Stack spacing={2.5} sx={{ flex: 1 }}>
        <Box>
          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "12px",
              mb: 0.8,
              fontWeight: 500,
            }}
          >
            Title
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              bgcolor: "#252632",
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                { borderColor: "#475569" },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "#3b82f6" },
              "& .MuiInputBase-input": { color: "#fff", fontSize: "14px" },
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "12px",
              mb: 0.8,
              fontWeight: 500,
            }}
          >
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              bgcolor: "#252632",
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                { borderColor: "#475569" },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "#3b82f6" },
              "& .MuiInputBase-input": { color: "#fff", fontSize: "14px" },
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "12px",
              mb: 0.8,
              fontWeight: 500,
            }}
          >
            Priority
          </Typography>
          <Select
            fullWidth
            size="small"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
            sx={{
              bgcolor: "#252632",
              color: "#fff",
              borderRadius: 2,
              fontSize: "14px",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#475569",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3b82f6",
              },
            }}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "12px",
              mb: 0.8,
              fontWeight: 500,
            }}
          >
            Due Date
          </Typography>
          <TextField
            type="date"
            fullWidth
            size="small"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            sx={{
              bgcolor: "#252632",
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                { borderColor: "#475569" },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "#3b82f6" },
              "& .MuiInputBase-input": { color: "#fff", fontSize: "14px" },
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "12px",
              mb: 0.8,
              fontWeight: 500,
            }}
          >
            Move To Stage
          </Typography>
          <Select
            fullWidth
            size="small"
            defaultValue=""
            onChange={(e) =>
              moveTask(task.id, e.target.value as Task["column"])
            }
            displayEmpty
            sx={{
              bgcolor: "#252632",
              color: "#fff",
              borderRadius: 2,
              fontSize: "14px",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
              "& :hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#475569",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Column
            </MenuItem>
            {task.column !== "backlog" && (
              <MenuItem value="backlog">Backlog</MenuItem>
            )}
            {task.column !== "inProgress" && (
              <MenuItem value="inProgress">In Progress</MenuItem>
            )}
            {task.column !== "done" && <MenuItem value="done">Done</MenuItem>}
          </Select>
        </Box>

        <Box>
          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "12px",
              mb: 0.8,
              fontWeight: 500,
            }}
          >
            Assignee
          </Typography>
          <Select
            fullWidth
            size="small"
            value={assigneeId}
            onChange={(e) => {
              setAssigneeId(e.target.value);
              assignTask(task.id, e.target.value);
            }}
            sx={{
              bgcolor: "#252632",
              color: "#fff",
              borderRadius: 2,
              fontSize: "14px",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
              "& :hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#475569",
              },
            }}
          >
            <MenuItem value="">Unassigned</MenuItem>
            {assignees.map((assignee) => (
              <MenuItem key={assignee.id} value={assignee.id}>
                {assignee.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "12px",
              mb: 0.8,
              fontWeight: 500,
            }}
          >
            Tag
          </Typography>
          <Select
            fullWidth
            size="small"
            value={tagId}
            onChange={(e) => {
              setTagId(e.target.value);
              assignTag(task.id, e.target.value);
            }}
            sx={{
              bgcolor: "#252632",
              color: "#fff",
              borderRadius: 2,
              fontSize: "14px",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
              "& :hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#475569",
              },
            }}
          >
            <MenuItem value="">No Tag</MenuItem>
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        onClick={handleSave}
        sx={{
          mt: "auto",
          bgcolor: "#3b82f6",
          textTransform: "none",
          fontWeight: 600,
          p: 1.2,
          borderRadius: 2.5,
          boxShadow: "none",
          "&:hover": { bgcolor: "#2563eb", boxShadow: "none" },
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
}

export default TaskPanel;
