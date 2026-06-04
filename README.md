# SprintDesk

SprintDesk is a Kanban-style task management application built with React, TypeScript, Zustand, and Material UI.

## Features

### Board Management

* Three columns:

  * Backlog
  * In Progress
  * Done
* Add new tasks directly into any column
* Live task count for each column
* Drag and drop tasks between columns

### Task Management

* Create tasks
* Edit task title
* Edit description
* Edit priority
* Set due date
* Delete tasks
* Move tasks between columns

### Search & Filtering

* Search tasks by title
* 300ms debounced search
* Filter by priority
* Filter by assignee
* Filter by tag
* Clear all filters
* Active filter count
* No results state message

### Sorting

* Sort tasks by priority
* Sort tasks by due date

### Assignees & Tags

* Assign tasks to team members
* Add and manage tags
* Filter tasks by assignee and tag

### Persistence

* Zustand state management
* Data persisted in localStorage
* Tasks are restored after page reload

## Tech Stack

* React 18
* TypeScript
* Vite
* Zustand
* Material UI (MUI)

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
├── store/
├── data/
├── types/
├── App.tsx
└── main.tsx
```

## Assumptions

* Tasks are stored in localStorage using Zustand Persist.
* Due dates can be assigned and sorted.
* Search and filter states reset on page reload.
* Drag and drop is implemented using the native HTML5 Drag and Drop API.

## Author

Your Name
Sucharita Sardar