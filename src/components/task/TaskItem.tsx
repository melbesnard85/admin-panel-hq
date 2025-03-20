import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Task } from '../../interfaces/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-between p-4 mb-2 bg-white rounded-sm shadow-sm hover:bg-gray-50 hover:shadow-md"
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
        >
          {task.completed && <Check size={14} className="text-white" />}
        </button>
        <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </motion.div>
  );
};

export default TaskItem;