// importing all
import axios from "axios";
import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaEnvelopeOpenText } from "react-icons/fa";
import Cookies from "js-cookie";
import {
  showNotificationForSuccess,
  showNotificationForError,
} from "../../Notification/Notify";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../Loader/loading";
import usePasswordStrength from "../../Reusebale/usePasswordStrength";

// Importing end

const LoginPage = () => {
  // for state work
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { passwordStrength, isValidPassword, handlePasswordChange } =
    usePasswordStrength();
  // form data setup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // input chaange
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // password toggle function
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  // login function to login
  const HandleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await axios
      .post("/user/login", formData)
      .then((result) => {
        if (result.data.status === true) {
          setIsSubmitting(false);
          showNotificationForSuccess(result.data.message);
          const token = result.data.token;
          Cookies.set("token", token, { expires: 7 }); // set token as a cookie
          navigate("/");
          window.location.reload();
          return;
        } else {
          setIsSubmitting(false);
          showNotificationForError(result.data.message);
          setFormData({
            email: "",
            password: "",
          });
          return;
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        showNotificationForError(error.message);
        setFormData({
          email: "",
          password: "",
        });
        return;
      });
  };

  // return jsx for login page
  return (
    <>
      <div id="Login-Page">
        <div className="signup-form">
          <h2>Login to your Account</h2>
          <form onSubmit={HandleLogin}>
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelopeOpenText /> Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter valid Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <FaLock /> Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter valid Password"
                  onChange={(event) => {
                    handleInputChange(event);
                    handlePasswordChange(event);
                  }}
                  required
                  className={!isValidPassword ? "invalid" : ""}
                />
                <span
                  className={`password-toggle ${showPassword ? "show" : ""}`}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div
                className={`password-strength ${
                  !isValidPassword ? "invalid" : ""
                }`}
              >
                {passwordStrength}
              </div>
              {!isValidPassword && (
                <p className="password-error">Enter Valid Password.</p>
              )}
            </div>
            {isSubmitting ? (
              <div className="loader">
                <Loading />
              </div>
            ) : (
              <button type="submit">Login</button>
            )}
          </form>
          <div className="line">
            <span>Or</span>
          </div>
          <div className="form-group">
            <Link className="ToPath" to={"/register"}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
