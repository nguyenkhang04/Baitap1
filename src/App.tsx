import React, { useState } from "react";
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

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 5;

  const addTask = (taskName: string) => {
    const newTask: TaskType = {
      id: Date.now(),
      taskName,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
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