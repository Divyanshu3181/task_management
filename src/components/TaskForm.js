import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { PlusCircle } from 'lucide-react';

export default function TaskForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTask(newTask));
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
          rows={3}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="datetime-local"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Task
      </button>
    </form>
  );
}