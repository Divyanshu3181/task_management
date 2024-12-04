import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskComplete, updateTask } from '../store/taskSlice';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import ConfirmationModal from './ConfirmationModal';

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = () => {
    dispatch(
      updateTask({
        ...task,
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate,
      })
    );
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTask(task.id));
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={editedDueDate}
          onChange={(e) => setEditedDueDate(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleUpdate}
            className="p-2 text-green-600 hover:text-green-800"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-red-600 hover:text-red-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTaskComplete(task.id))}
            className="mt-1"
          />
          <div>
            <h3
              className={`text-lg font-semibold ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Due: {formatDate(task.dueDate)}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-2 text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          task={task}
        />
      )}
    </div>
  );
}
