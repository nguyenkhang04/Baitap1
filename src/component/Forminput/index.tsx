import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "./styles.scss";
import Divider from "../Divider";
interface FormProps {
  onAddTask: (taskname: string) => void;
}
const Form: React.FC<FormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const handleAddTask = () => {
    if (taskName.trim()) {
      onAddTask(taskName);
      setTaskName("");
    }
  };
  return (
    <div className="todo-list-header">
      <h2 className="todo-list-header__title">TO DO LIST APPLICATION</h2>
      <form
        className="todo-list-header__form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <Input
          placeholder="Add new task here"
          className="todo-list-header__input"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit" className="todo-list-header__btn-add-task">
          <PlusCircleOutlined style={{ fontSize: "25px" , padding: "10px"}} />
        </button>
      </form>
      <Divider />
    </div>
  );
};
export default Form;
