import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addTask, deleteTask, setError, setLoading, setTasks, toggleTask } from "../store/taskSlice";
import { fetchTasks } from "../services/task";
import { RootState } from "../store/store";
import AddTaskForm from "../components/task/AddTaskForm";
import TaskList from "../components/task/TaskList";
import DefaultLayout from "../layout/DefaultLayout";
import Logo from '../images/logo/logo.png';

function Task() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    const loadTasks = async () => {
      dispatch(setLoading(true));
      try {
        const initialTasks = await fetchTasks();
        dispatch(setTasks(initialTasks));
      } catch (err) {
        dispatch(setError('Failed to load tasks'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (tasks.length === 0) {
      loadTasks();
    }
  }, [dispatch, tasks.length]);

  const handleAddTask = (title: string) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    dispatch(addTask(newTask));
  };

  const handleToggleTask = (id: number) => {
    dispatch(toggleTask(id));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-700">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="bg-white rounded-sm shadow-lg p-6">
            <div className="flex items-center gap-3 mb-8">
              <img src={Logo} width="32" height="32" alt="" />
              <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
            </div>

            <AddTaskForm onAdd={handleAddTask} />

            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                {error}
              </div>
            )}

            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>

  )
}

export default Task
