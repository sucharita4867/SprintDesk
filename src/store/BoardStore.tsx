import { create } from "zustand";
import { seedTasks } from "../data/seedTasks";
import type { Task } from "../types/Task";

interface BoardStore {
  tasks: Task[];
  addTask: (column: Task["column"]) => void;
  deleteTask: (id: string) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  tasks: seedTasks,
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
}));
