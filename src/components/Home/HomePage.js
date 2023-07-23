import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  // return homepage jsx
  return (
    <>
      <div id="Home_page">
        <div className="container">
          <div className="profile-card">
            <h1 className="welcome-message">Welcome to User Task Management</h1>
            <div className="other_path">
              <Link className="create-task" to={"/new-task"}>
                create new task
              </Link>
              <Link className="view-tasks" to={"/view-tasks"}>
                view all tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
