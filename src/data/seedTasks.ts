import type { Task } from "../types/task";

export const seedTasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create homepage layout",
    priority: "high",
    column: "backlog",
  },

  {
    id: "2",
    title: "Fix Login Bug",
    description: "Resolve authentication issue",
    priority: "medium",
    column: "inProgress",
  },

  {
    id: "3",
    title: "Write Documentation",
    description: "Prepare project docs",
    priority: "low",
    column: "done",
  },
];
