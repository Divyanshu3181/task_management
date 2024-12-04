import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredTasks } from '../store/taskSlice';
import TaskItem from './TaskItem';
import { reorderTasks, deleteTask } from '../store/taskSlice';
import ConfirmationModal from './ConfirmationModal';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.id));
      setTaskToDelete(null);
      setModalOpen(false);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    dispatch(
      reorderTasks({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };
  

  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          onConfirm={confirmDelete}
          onCancel={() => setModalOpen(false)}
          task={taskToDelete}
        />
      )}
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Start by adding a new task!
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <div
                className="space-y-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem
                          task={task}
                          onDelete={() => handleDelete(task)}
                          index={index}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}
