import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./component/Task";
import Forminput from "./component/Forminput";
import Divider from "./component/Divider";
import { Pagination } from "antd";

interface TaskType {
  id: number;
  taskName: string;
  isDone: boolean;
}
const LOCAL_STORAGE_KEY = "tasks";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 5;

  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (taskName: string) => {
    const newTask: TaskType = {
      id: Date.now(),
      taskName,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
    setCurrentPage(1);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    const totalPages = Math.ceil(updatedTasks.length / tasksPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  };

  const doneTask = (id: number) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, isDone: true } : task))
    );
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const renderTaskList = (tasks: TaskType[]) =>
    tasks.map((task) => (
      <Task
        key={task.id}
        taskName={task.taskName}
        isDone={task.isDone}
        onDelete={() => deleteTask(task.id)}
        onDone={() => doneTask(task.id)}
      />
    ));

  return (
    <div className="App">
      <div className="todo-list-container">
        <div className="todo-list-wrapper">
          <Forminput onAddTask={addTask} />
          <div className="todo-list-main">{renderTaskList(currentTasks)}</div>
          <Divider />
          <div className="todo-list-pagination">
            <Pagination
              current={currentPage}
              pageSize={tasksPerPage}
              total={tasks.length}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
