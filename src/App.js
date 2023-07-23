// importing all important files
import HomePage from "./components/Home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenCookie } from "./Context/CookieGet";
import SignupPage from "./components/SignUp/SignupPage";
import Navbar from "./components/NavBar/Navbar";
import LoginPage from "./components/Login/LoginPage";
import Footer from "./components/NavBar/Footer";
import axios from "axios";
import NewTaskFormComponent from "./components/Tasks/newTask";
import TaskListComponent from "./components/Tasks/viewTasks";
// set base url of backend
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
function App() {
  // for user auth
  const user = getTokenCookie();
  return (
    <>
      {/* toaster for noti */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
            {/* home route */}
            <Route
              index
              path="/"
              element={user ? <HomePage /> : <LoginPage />}
            />
            {/* login route */}
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <HomePage />}
            />
            {/* register route */}
            <Route
              path="/register"
              element={!user ? <SignupPage /> : <HomePage />}
            />
            {/* add new task route */}
            <Route
              path="/new-task"
              element={!user ? <LoginPage /> : <NewTaskFormComponent />}
            />
            {/* all task showing */}
            <Route
              path="/view-tasks"
              element={!user ? <LoginPage /> : <TaskListComponent />}
            />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
