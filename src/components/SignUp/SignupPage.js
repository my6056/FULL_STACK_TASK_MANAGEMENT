// importing important files
import React, { useState } from "react";
import {
  FaUser,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showNotificationForError,
  showNotificationForSuccess,
} from "../../Notification/Notify";
import usePasswordStrength from "../../Reusebale/usePasswordStrength";
import Loading from "../../Loader/loading";
// importing end

// signup component

const SignupPage = () => {
  // state use
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { passwordStrength, isValidPassword, handlePasswordChange } =
    usePasswordStrength();
  // data use
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // input chaange
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // pssword show hide
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  // register function
  const HandleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await axios
      .post("/user/sign_up", formData)
      .then((result) => {
        if (result.data.status === true) {
          setIsSubmitting(false);
          showNotificationForSuccess(result.data.message);
          navigate("/login");
          return;
        } else {
          setIsSubmitting(false);
          showNotificationForError(result.data.message);
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          return;
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        showNotificationForError(error.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        return;
      });
  };

  // return jsx for register
  return (
    <>
      <div id="SignUp-Page">
        <div className="signup-form">
          <h2>Create an Account</h2>
          <form onSubmit={HandleRegister}>
            <div className="form-group">
              <label htmlFor="userName">
                <FaUser /> Name
              </label>
              <input
                type="text"
                id="userName"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter valid Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">
                <FaEnvelopeOpenText /> Email
              </label>
              <input
                type="text"
                id="userEmail"
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
                  type={"password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(event) => {
                    handleInputChange(event);
                    handlePasswordChange(event);
                  }}
                  className={!isValidPassword ? "invalid" : ""}
                  required
                  placeholder="Enter valid Password"
                />
              </div>
              <div
                className={`password-strength ${!isValidPassword && "invalid"}`}
              >
                {passwordStrength}
              </div>
              {!isValidPassword && (
                <p className="password-error">
                  Password should be min 6 digits with one special and Capital
                  Letter
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <FaLock /> Re-Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Confirm Password"
                />
                <span
                  className={`password-toggle ${showPassword ? "show" : ""}`}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            {isSubmitting ? (
              <div className="loader">
                <Loading />
              </div>
            ) : (
              <button type="submit">Register</button>
            )}
          </form>
          <div className="line">
            <span>Or</span>
          </div>
          <div className="form-group">
            <Link className="ToPath" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
