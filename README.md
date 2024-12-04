# Task Manager Application

## Overview

The **Task Manager Application** is a robust and user-friendly tool to manage tasks efficiently. It allows users to create, update, filter, search, and delete tasks, providing a seamless experience for personal or professional task management. The app also incorporates a **confirmation modal** for critical actions like deleting tasks or clearing all tasks, ensuring user actions are intentional and secure.

---

## Features

### Core Features
- **Task Creation**  
  Users can add tasks with detailed information, including title, description, and due date.

- **Task Status Management**  
  Mark tasks as `Pending`, `Completed`, or `Overdue`.

- **Search Functionality**  
  Search tasks dynamically with a search bar that uses **debouncing** for optimized performance.

- **Task Filters**  
  Filter tasks based on their status:
  - All Tasks
  - Pending
  - Completed
  - Overdue

- **Clear All Tasks**  
  A single click to remove all tasks, with a confirmation modal to avoid accidental deletions.

- **Persistent Storage**  
  Tasks are saved in **localStorage**, ensuring they persist even after a page refresh.

- **Confirmation Modal**  
  Used for actions like deleting individual tasks or clearing all tasks. It ensures user confirmation before critical actions.

- **Responsive Design**  
  Optimized for both desktop and mobile views, offering a seamless experience across devices.

---

## How It Works

1. **Task Management**  
   Users can create tasks by filling out a form. Tasks can be updated or deleted individually.

2. **Search and Filters**  
   The search bar dynamically filters tasks based on the entered query. Filters can be applied to view tasks by their status.

3. **Confirmation Modal**  
   - For deleting a single task: A modal confirms the deletion of the specific task.  
   - For clearing all tasks: The modal confirms the removal of all tasks.

4. **Persistence**  
   The application saves tasks in **localStorage**, allowing tasks to persist across sessions.

---

## Tech Stack

### Frontend
- **React.js**: Component-based UI library.
- **Redux Toolkit**: State management for tasks and filters.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.

### Utilities
- **LocalStorage**: For persisting tasks across sessions.
- **Lucide Icons**: Icons for UI elements like search.

### Additional Features
- **Error Handling**: Ensures the application gracefully manages unexpected issues, such as invalid data or empty states.
- **Debouncing**: Optimizes the search functionality for better performance.

---

## Installation and Setup

### Prerequisites
- Node.js installed on your machine.

### Steps
 **Clone the Repository**  
   ```bash
   git clone https://github.com/your-repo/task-manager-app.git

