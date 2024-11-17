import React from "react";
import "./styles.scss";
import Divider from "../Divider";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

interface TaskProps {
  taskName: string;
  isDone: boolean;
  onDelete: () => void;
  onDone: () => void;
}

const Task: React.FC<TaskProps> = ({ taskName, isDone, onDelete, onDone }) => {
  return (
    <React.Fragment>
      <div className={`task ${isDone ? "task-done" : ""}`}>
        <p className="task__name">{taskName}</p>
        <div className="task__group-btn">
          {!isDone && (
            <button className="task__btn-done" onClick={onDone}>
              <CheckOutlined style={{ fontSize: "20px" }} />
            </button>
          )}
          <button className="task__btn-del" onClick={onDelete}>
            <DeleteOutlined style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
      <Divider />
    </React.Fragment>
  );
};
export default Task;
