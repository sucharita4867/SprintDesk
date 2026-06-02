import { create } from "zustand";
import { seedTasks } from "../data/seedTasks";
import type { Task } from "../types/task";

interface BoardStore {
  tasks: Task[];
}

export const useBoardStore = create<BoardStore>(() => ({
  tasks: seedTasks,
}));
