# SprintDesk

SprintDesk is a Kanban-style task management application built with React, TypeScript, Zustand, and Material UI. The application helps users organize tasks efficiently using a drag-and-drop workflow across multiple stages.

# Live Demo

* Live Site: https://sprintdesk-13.netlify.app
* GitHub Repository: https://github.com/sucharita4867/SprintDesk

# Features

# Board Management

* Three workflow columns:

  * Backlog
  * In Progress
  * Done
* Add tasks directly to any column
* Live task count for each column
* Drag and drop tasks between columns
* Move tasks using the task detail panel

# Task Management

* Create new tasks
* Edit task title
* Edit task description
* Update task priority
* Set and update due dates
* Delete tasks
* View task details in a side panel

## Search, Filter & Sort

* Search tasks by title
* 300ms debounced search
* Filter by priority
* Filter by assignee
* Filter by tag
* Clear all filters with a single click
* Active filter count display
* No matching results state

# Sorting

* Sort tasks by priority
* Sort tasks by due date
* Default task ordering

## Assignees & Tags

* Assign team members to tasks
* Manage task tags
* Filter tasks by assignee
* Filter tasks by tag

## Persistence

* Zustand state management
* Zustand Persist middleware
* Data stored in localStorage
* Tasks restored automatically after page refresh

## Tech Stack

* React 18
* TypeScript
* Vite
* Zustand
* Zustand Persist
* Material UI (MUI)
* Native HTML5 Drag and Drop API

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Project Structure

```text
src/
├── components/
│   ├── Column/
│   ├── TaskCard/
│   ├── TaskPanel/
│
├── store/
├── data/
├── types/
├── App.tsx
└── main.tsx
```

## Assumptions

* Tasks are persisted using Zustand Persist and localStorage.
* Search and filter states reset after page reload.
* Drag and drop is implemented using the native HTML5 Drag and Drop API.
* Due dates can be assigned and sorted.
* Assignees and tags are shared across tasks.

## Author

**Sucharita Sardar**
