import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchQuery, setTasks } from '../store/taskSlice';
import { Search } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

export default function TaskFilters() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const tasks = useSelector((state) => state.tasks.tasks);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const clearTasks = () => {
    try {
      localStorage.removeItem('tasks');
      dispatch(setTasks([]));
    } catch (error) {
      console.error('Failed to clear tasks:', error);
    }
  };

  const showConfirmationModal = () => {
    setIsModalVisible(true);
  };

  const handleModalConfirm = () => {
    clearTasks();
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => dispatch(setFilter(filter.value))}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentFilter === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
          {tasks.length > 0 && (
            <button
              onClick={showConfirmationModal}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Clear All Tasks
            </button>
          )}
        </div>
      </div>

      {isModalVisible && (
        <ConfirmationModal
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          task={{ name: 'all tasks' }}
        />
      )}

      <div className="flex flex-wrap gap-2">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            {task.name}
          </div>
        ))}
      </div>
    </div>
  );
}
