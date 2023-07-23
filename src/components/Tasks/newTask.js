// importing important files
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { FaAngleLeft } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { getTokenCookie } from "../../Context/CookieGet";
import axios from "axios";
import {
  showNotificationForError,
  showNotificationForSuccess,
} from "../../Notification/Notify";
import Loading from "../../Loader/loading";
// form component for new tsk
const NewTaskFormComponent = () => {
  // user auth use
  const navigate = useNavigate();
  const user = getTokenCookie();
  let userId = "";
  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    userId = tokenPayload.userId; // Assign the value to userName
  }
  const [isSubmitting, setIsSubmitting] = useState(false);
  // back button handles
  const hadnleBack = () => {
    navigate(-1);
    return;
  };

  // task data
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
  });
  // input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  // new task creation function
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await axios.post(`/task/${userId}/create_task`, newTask);
      if (result.data.status === true) {
        setIsSubmitting(false);
        showNotificationForSuccess(result.data.message);
        setTimeout(() => {
          navigate("/view-tasks");
        }, 3000);
        window.location.reload();
        return;
      } else {
        setIsSubmitting(false);
        showNotificationForError(result.data.message);
        return;
      }
    } catch (error) {
      setIsSubmitting(false);
      showNotificationForError(error.message);
      return;
    }
  };

  return (
    // return jsx for task form
    <div id="taskPage">
      <form className="task-form" onSubmit={handleSubmit}>
        <TextField
          className="task-form-input"
          fullWidth
          name="title"
          label="Title"
          variant="outlined"
          required
          value={newTask.title}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <TextField
          className="task-form-input"
          fullWidth
          name="description"
          label="Description"
          variant="outlined"
          required
          value={newTask.description}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <TextField
          className="task-form-input"
          fullWidth
          name="due_date"
          label="Due Date"
          type="date"
          variant="outlined"
          required
          value={newTask.due_date}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <TextField
          className="task-form-input"
          fullWidth
          select
          name="status"
          label="Status"
          variant="outlined"
          required
          value={newTask.status}
          onChange={handleInputChange}
        >
          <option value="pending">Pending</option>
        </TextField>
        <br />
        <br />
        {isSubmitting ? (
          <div className="loader">
            <Loading />
          </div>
        ) : (
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            className="task-form-button"
          >
            Create Task
          </Button>
        )}
        <div className="back-page">
          <button className="back-button-icon" onClick={hadnleBack}>
            <FaAngleLeft />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTaskFormComponent;
