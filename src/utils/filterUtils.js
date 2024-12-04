import { isOverdue } from './dateUtils';


export const filterTasks = (tasks, filter, searchQuery) => {
    let filteredTasks = tasks;
  
    if (searchQuery) {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    switch (filter) {
      case 'completed':
        return filteredTasks.filter((task) => task.completed);
      case 'pending':
        return filteredTasks.filter((task) => !task.completed);
      case 'overdue':
        return filteredTasks.filter(
          (task) => !task.completed && isOverdue(task.dueDate)
        );
      default:
        return filteredTasks;
    }
  };