import React, { useState } from "react";
// import "../styles/login.scss";
import Dropdown from "../comps/Dropdown";
import Logo from "../resources/images/logo.png";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("");
  const [toggleState, setToggleState] = useState(0);


  const notify = () => {
    return toast.error("Invalid credentials", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };
  const loginHandler = () => {
    console.log("#---userName: ", userName);
    console.log("#---password ", password);
    if (toggleState === 0) {
      notify();
    } else if (toggleState === 1) {
      notify();
    } else {
      if (userName === "admin" && password === "secret!1") {
        // navigate("/sh-dash-b0ard");
        return <Link href={"/sh-dash-b0ard"} />;
      } else {
        notify();
      }
    }
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleParentLogin = () => {
    setToggleState(0);
    // SEND OTP
  };

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__cardTopContent">
          <div className="login__logoContainer">
            <Image src={Logo} alt="school nestpay" />
          </div>
          <div className="login__text">
            <span>Sign In</span> to your Account as
          </div>
          <div className="login__accountsTab">
            <div
              onClick={handleParentLogin}
              className={
                toggleState === 0 ? "login__tab activeTab" : "login__tab"
              }
            >
              Parent
            </div>
            <div
              onClick={() => toggleTab(1)}
              className={
                toggleState === 1 ? "login__tab activeTab" : "login__tab"
              }
            >
              Student
            </div>
            <div
              onClick={() => toggleTab(2)}
              className={
                toggleState === 2 ? "login__tab activeTab" : "login__tab"
              }
            >
              School
            </div>
          </div>
        </div>
        {toggleState !== 0 && (
          <div className="getStartedPage__textField">
            <label className="getStartedPage__label">Country</label>
            <Dropdown
              selected={selected}
              setSelected={setSelected}
              options={["Rwanda", "Kenya", "Uganda"]}
            />
          </div>
        )}
        {toggleState === 0 ? (
          <div className="getStartedPage__textField">
            <label className="getStartedPage__label">Phone Number</label>
            <input
              className="inputField"
              type="number"
              id="parentPhonenumber"
              name="parentPhonenumber"
            ></input>
          </div>
        ) : toggleState === 1 ? (
          <div className="getStartedPage__textField">
            <label className="getStartedPage__label">Student Id</label>
            <input
              className="inputField"
              type="number"
              id="studentId"
              name="studentId"
            ></input>
          </div>
        ) : (
          <>
            <div className="getStartedPage__textField login__schoolLogin">
              <label className="getStartedPage__label">Username</label>
              <input
                className="inputField"
                type="number"
                id="schoolId"
                name="schoolId"
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </div>
            <div className="getStartedPage__textField login__schoolLogin">
              <label className="getStartedPage__label">Password</label>
              <input
                className="inputField"
                type="password"
                id="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          </>
        )}
        {/* {toggleState === 0 ? (
          <Link
            className="getStartedPage__formBtn proceedBtn"
            to="/pr-dash-b0ard"
          >
            Sign In
          </Link>
        ) : toggleState === 1 ? (
          <Link
            className="getStartedPage__formBtn proceedBtn"
            to="/st-dash-b0ard"
          >
            Sign In
          </Link>
        ) : (
          <Link
            className="getStartedPage__formBtn proceedBtn"
            to="/sh-dash-b0ard"
          >
            Sign In
          </Link>
        )} */}
        <div
          onClick={loginHandler}
          className="getStartedPage__formBtn proceedBtn"
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default Login;
