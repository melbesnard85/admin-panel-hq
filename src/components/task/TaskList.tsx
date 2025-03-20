import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import { Task } from '../../interfaces/task';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  return (
    <div className="space-y-">
      <AnimatePresence>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;