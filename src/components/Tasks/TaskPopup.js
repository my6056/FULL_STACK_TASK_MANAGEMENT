// importing important files
import React, { useState } from "react";
import PropTypes from "prop-types";
// tsk popup component
const TaskPopup = ({ isOpen, onClose, onUpdateTask, task }) => {
  // state use
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [status, setStatus] = useState(task.status);

  // submittion handle
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
      due_date: dueDate,
      status,
    };
    onUpdateTask(updatedTask);
    onClose();
  };

  return (
    // return jsx for popup
    <div className={`task-popup ${isOpen ? "open" : ""}`}>
      <div className="task-popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit">Update Task</button>
        </form>
      </div>
    </div>
  );
};

TaskPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["pending", "in_progress", "completed"]).isRequired,
  }).isRequired,
};

export default TaskPopup;
