import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedTasks } from "../data/seedTasks";
import type { Task } from "../types/Task";
import type { Assignee } from "../types/Assignee";
import { seedAssignees } from "../data/seedAssignees";
import type { Tag } from "../types/Tag";
import { seedTags } from "../data/seedTags";

interface BoardStore {
  tasks: Task[];
  addTask: (column: Task["column"]) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  moveTask: (taskId: string, column: Task["column"]) => void;
  reorderTask: (taskId: string, newColumn: Task["column"]) => void;
  assignees: Assignee[];
  assignTask: (taskId: string, assigneeId: string) => void;
  tags: Tag[];

  assignTag: (taskId: string, tagId: string) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      tasks: seedTasks,
      assignees: seedAssignees,
      tags: seedTags,
      addTask: (column) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now().toString(),
              title: "New Task",
              description: "",
              priority: "low",
              column,
            },
          ],
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task,
          ),
        })),
      moveTask: (taskId, column) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, column } : task,
          ),
        })),
      reorderTask: (taskId, newColumn) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, column: newColumn } : task,
          ),
        })),
      assignTask: (taskId, assigneeId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, assigneeId } : task,
          ),
        })),
      assignTag: (taskId, tagId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, tagId } : task,
          ),
        })),
    }),
    {
      name: "sprintdesk-storage",
    },
  ),
)
