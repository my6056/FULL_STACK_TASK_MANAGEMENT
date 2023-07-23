import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getTokenCookie } from "../../Context/CookieGet";
import {
  showNotificationForError,
  showNotificationForSuccess,
} from "../../Notification/Notify";
import Cookies from "js-cookie";
const Navbar = () => {
  const user = getTokenCookie();
  let name = ""; // Initialize with an empty string
  let email = "";
  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    name = tokenPayload.name; // Assign the value to userName
    email = tokenPayload.email;
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Logout = async (e) => {
    alert("Are you sure to logout");
    try {
      if (user) {
        Cookies.remove("token");
        showNotificationForSuccess("Logout Successfull");
        window.location.reload();
        return;
      }
    } catch (error) {
      showNotificationForError(error.message);
      return;
    }
  };
  return (
    <div>
      <span className="background"></span>{" "}
      <div className="menu__wrapper">
        {" "}
        <div className="menu__bar">
          {" "}
          <a href="/" title="Logo">
            {" "}
            <img
              className="logo"
              src={"https://img.icons8.com/nolan/96/bluestacksx.png"}
              title="Logo"
              alt="Logo"
            />
          </a>
          <FontAwesomeIcon
            className="menu-icon"
            icon={isMenuOpen ? faTimes : faBars}
            title={isMenuOpen ? "Close Menu" : "Burger Menu"}
            onClick={toggleMenu}
          />{" "}
          <menu
            className={`navigation ${isMenuOpen ? "navigation--mobile" : ""}`}
          >
            {" "}
            {user && (
              <>
                <li>{name}</li> <li>{email}</li>
                <li>
                  <button className="Logout-bttn" onClick={Logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
