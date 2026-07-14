import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Column from "./components/Column/Column";
import TaskPanel from "./components/TaskPanel/TaskPanel";
import { useBoardStore } from "./store/BoardStore";
import type { Task } from "./types/Task";

function App() {
  const tasks = useBoardStore((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesAssignee =
      assigneeFilter === "all" || task.assigneeId === assigneeFilter;
    const matchesTag = tagFilter === "all" || task.tagId === tagFilter;
    return matchesSearch && matchesPriority && matchesAssignee && matchesTag;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const sortedTasks = [...filteredTasks];

  if (sortBy === "priority") {
    const priorityOrder: Record<"low" | "medium" | "high", number> = {
      high: 3,
      medium: 2,
      low: 1,
    };
    sortedTasks.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
    );
  } else if (sortBy === "dueDate") {
    sortedTasks.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB;
    });
  }

  const backlogTasks = sortedTasks.filter((task) => task.column === "backlog");
  const inProgressTasks = sortedTasks.filter(
    (task) => task.column === "inProgress",
  );
  const doneTasks = sortedTasks.filter((task) => task.column === "done");
  const assignees = useBoardStore((state) => state.assignees);
  const tags = useBoardStore((state) => state.tags);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const activeFilterCount =
    (searchText ? 1 : 0) +
    (priorityFilter !== "all" ? 1 : 0) +
    (assigneeFilter !== "all" ? 1 : 0) +
    (tagFilter !== "all" ? 1 : 0);

  const handleClearFilters = () => {
    setSearchText("");
    setPriorityFilter("all");
    setAssigneeFilter("all");
    setTagFilter("all");
  };

  const handlePriorityFilterChange = (e: SelectChangeEvent<string>) => {
    setPriorityFilter(e.target.value);
  };

  const handleAssigneeFilterChange = (e: SelectChangeEvent<string>) => {
    setAssigneeFilter(e.target.value);
  };

  const handleTagFilterChange = (e: SelectChangeEvent<string>) => {
    setTagFilter(e.target.value);
  };

  const handleSortByChange = (e: SelectChangeEvent<string>) => {
    setSortBy(e.target.value);
  };

  const isPanelOpen = selectedTask !== null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#15161e",
        color: "#f5f5f7",
        p: 3,
        pt: 2,
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #2b2d3d",
          pb: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "0.5px",
            background: "linear-gradient(45deg, #3b82f6, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SprintDesk
        </Typography>
      </Box>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          alignItems: "center",
          backgroundColor: "#1e1f29",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #2b2d3d",
          marginBottom: "32px",
          flexWrap: "wrap",
          width: isPanelOpen ? "calc(100% - 380px)" : "100%",
          transition: "width 0.3s ease",
          boxSizing: "border-box",
        }}
      >
        <TextField
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#64748b" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: { xs: "100%", md: "260px" },
            bgcolor: "#252632",
            borderRadius: 2,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#475569",
            },
            "& .MuiInputBase-input": { color: "#fff", fontSize: "14px" },
          }}
        />

        <Stack
          direction="row"
          spacing={1.5}
          sx={{ flexWrap: "wrap", width: { xs: "100%", md: "auto" } }}
        >
          <Select
            value={priorityFilter}
            onChange={handlePriorityFilterChange}
            size="small"
            sx={{
              bgcolor: "#252632",
              color: "#fff",
              borderRadius: 2,
              fontSize: "13px",
              height: "40px",
              minWidth: 130,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
            }}
          >
            <MenuItem value="all">Priority: All</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>

          <Select
            value={assigneeFilter}
            onChange={handleAssigneeFilterChange}
            size="small"
            sx={{
              bgcolor: "#252632",
              color: "#fff",
              borderRadius: 2,
              fontSize: "13px",
              height: "40px",
              minWidth: 140,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
            }}
          >
            <MenuItem value="all">All Assignees</MenuItem>
            {assignees.map((assignee) => (
              <MenuItem key={assignee.id} value={assignee.id}>
                {assignee.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={tagFilter}
            onChange={handleTagFilterChange}
            size="small"
            sx={{
              bgcolor: "#252632",
              color: "#fff",
              borderRadius: 2,
              fontSize: "13px",
              height: "40px",
              minWidth: 120,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
            }}
          >
            <MenuItem value="all">All Tags</MenuItem>
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={sortBy}
            onChange={handleSortByChange}
            size="small"
            sx={{
              bgcolor: "#252632",
              color: "#fff",
              borderRadius: 2,
              fontSize: "13px",
              height: "40px",
              minWidth: 130,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2b2d3d" },
            }}
          >
            <MenuItem value="default">Default Sort</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="dueDate">Due Date</MenuItem>
          </Select>
        </Stack>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "auto",
            boxSizing: "border-box",
          }}
        >
          <Button
            onClick={handleClearFilters}
            variant="outlined"
            size="small"
            sx={{
              color: "#ef4444",
              borderColor: "rgba(239, 68, 68, 0.2)",
              textTransform: "none",
              borderRadius: 2,
              height: "40px",
              "&:hover": {
                borderColor: "#ef4444",
                bgcolor: "rgba(239, 68, 68, 0.05)",
              },
            }}
          >
            Clear Filters
          </Button>
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontWeight: 500,
              whiteSpace: "nowrap",
              ml: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            Active Filters:{" "}
            <Box
              component="span"
              sx={{ color: "#3b82f6", fontWeight: 600, ml: 0.5 }}
            >
              {activeFilterCount}
            </Box>
          </Typography>
        </div>
      </div>

      {filteredTasks.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            bgcolor: "#1e1f29",
            borderRadius: 4,
            border: "1px dashed #2b2d3d",
            mb: 4,
            width: isPanelOpen ? "calc(100% - 380px)" : "100%",
            transition: "width 0.3s ease",
          }}
        >
          <Typography variant="h6" sx={{ color: "#94a3b8" }}>
            No tasks match your filters
          </Typography>
        </Box>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          alignItems: "flex-start",
          width: isPanelOpen ? "calc(100% - 380px)" : "100%",
          transition: "width 0.3s ease",
        }}
      >
        <Column
          title="Backlog"
          tasks={backlogTasks}
          columnType="backlog"
          onTaskClick={handleTaskClick}
          indicatorColor="#94a3b8"
        />
        <Column
          title="In Progress"
          tasks={inProgressTasks}
          columnType="inProgress"
          onTaskClick={handleTaskClick}
          indicatorColor="#ef4444"
        />
        <Column
          title="Done"
          tasks={doneTasks}
          columnType="done"
          onTaskClick={handleTaskClick}
          indicatorColor="#10b981"
        />
      </div>

      <TaskPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
    </Box>
  );
}

export default App;
