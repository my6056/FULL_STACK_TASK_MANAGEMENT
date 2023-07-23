// importing important files
import React, { useState, useEffect } from "react";
import { getTokenCookie } from "../../Context/CookieGet";
import axios from "axios";
import {
  showNotificationForError,
  showNotificationForSuccess,
} from "../../Notification/Notify";
import TaskPopup from "./TaskPopup";

// task list component
const TaskListComponent = () => {
  // use state
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [isReloaded, setIsReloaded] = useState(false);
  // for show all task in page when render
  useEffect(() => {
    // Function to fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/task/${userId}/get_tasks`);
        if (response.data.status === true) {
          const tasksData = await response.data.tasks;
          const sortedTasks = sortTaskByCreation(tasksData);
          setTasks(sortedTasks);
          setIsReloaded(false);
          return;
        } else {
          showNotificationForError(response.data.message);
          return;
        }
      } catch (error) {
        showNotificationForError(error.message);
        return;
      }
    };

    if (!isReloaded) {
      // Only fetch tasks if the component is not reloaded
      fetchTasks();
    }
  }, [isReloaded]);
  // task sorting function
  const sortTaskByCreation = (tasksData) => {
    // sorting here
    return tasksData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const handleToggleDescription = (taskId) => {
    setExpandedTaskId((prevState) => (prevState === taskId ? null : taskId));
  };
  // use auth use
  const user = getTokenCookie();
  let userId = "";
  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    userId = tokenPayload.userId; // Assign the value to userName
  }
  const [isPopupOpen, setPopupOpen] = useState(false);
  // data for task
  const [selectedTask, setSelectedTask] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
  });
  const [taskIdToUpdate, setTaskIdToUpdate] = useState(null);
  // popup show hide handle
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setTaskIdToUpdate(task._id);
    setPopupOpen(true);
  };
  // close popup
  const handleClosePopup = () => {
    setPopupOpen(false);
    setTaskIdToUpdate(null);
  };

  // haandle task update function
  const handleUpdateTask = async (updatedTask) => {
    const taskId = taskIdToUpdate;
    try {
      const response = await axios.put(
        `/task/update_task/${taskId}`,
        updatedTask
      );
      if (response.data.status === true) {
        showNotificationForSuccess(response.data.message);
        window.location.reload();
        handleClosePopup();
        return;
      } else {
        showNotificationForError(response.data.message);
        handleClosePopup();
        return;
      }
    } catch (error) {
      showNotificationForError(error.message);
      return;
    }
  };

  // delete tsk handle
  const handleDeleteTask = async (taskId) => {
    try {
      alert("Are you sure to delete this task ?");
      const response = await axios.delete(`/task/delete_task/${taskId}`);
      if (response.data.status === true) {
        showNotificationForSuccess(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        return;
      } else {
        showNotificationForError(response.data.message);
        return;
      }
    } catch (error) {
      showNotificationForError(error.message);
      return;
    }
  };
  // date formate
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // jsx return for viewtask
  return (
    <div className="task-list-container">
      <h2 className="task-list-title">All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`task-item ${
                expandedTaskId === task._id ? "expanded" : ""
              }`}
            >
              <div className="task-header">
                <span className="task-title">{task.title}</span>
                <span className={`task-status ${task.status.toLowerCase()}`}>
                  {task.status}
                </span>
              </div>
              {expandedTaskId === task._id && (
                <div className="task-details">
                  <p className="task-description">{task.description}</p>
                </div>
              )}
              <div className="due_date">
                {" "}
                Due-Date : {formatDate(task.due_date)}
              </div>
              <div className="task-actions">
                <button
                  className="edit-btn"
                  // onClick={() => handleEditTask(task._id)}
                  onClick={() => handleEditClick(task)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
                <button
                  className="collapse-btn"
                  onClick={() => handleToggleDescription(task._id)}
                >
                  {expandedTaskId === task._id ? "Show Less" : "Show More"}
                </button>
              </div>
              <TaskPopup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                onUpdateTask={handleUpdateTask}
                task={selectedTask}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskListComponent;
