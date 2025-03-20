import axios from "axios";
import { Task } from "../interfaces/task";

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/todos?_limit=5`);
  return response.data;
};