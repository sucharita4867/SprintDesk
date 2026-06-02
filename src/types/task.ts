export type ColumnType = "backlog" | "inProgress" | "done";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;

  priority: Priority;

  dueDate?: string;

  assigneeId?: string;

  tagId?: string;

  column: ColumnType;
}
