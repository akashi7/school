import React, { useState, useEffect, useRef } from "react";
import "../styles/userProfile.scss";
import Logo from "../resources/images/logo.png";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function UserProfile({ userName, userEmail, userPhoneNumber }) {
  const [isActive, setIsActive] = useState(false);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * HIDE DROP DOWN CONTENT
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsActive(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <div ref={wrapperRef} className="userProfile">
      <div className="userProfile__profile">
        <div className="userProfile__profileAvatar">
          <img src={Logo} alt="nestpay" />
        </div>
        <div className="userProfile__accountInfo">
          <div className="userProfile__profileNames">{userName}</div>
          <div className="userProfile__profileEmail">{userEmail}</div>
        </div>
        <div className="userProfile__arrow">
          {isActive ? (
            <FiChevronUp color="black" onClick={() => setIsActive(!isActive)} />
          ) : (
            <FiChevronDown
              color="black"
              onClick={() => setIsActive(!isActive)}
            />
          )}
        </div>
      </div>
      {isActive && (
        <div className="userProfile__dropdownContent">
          <div className="userProfile__item userProfile__logout">
            Update Profile
          </div>
          <div className="userProfile__item userProfile__logout">Logout</div>
        </div>
      )}
    </div>
  );
}
