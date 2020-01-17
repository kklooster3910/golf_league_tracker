import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { logout } from "../../actions/session_actions";
import SignUpModal from "../modal/signup_modal";
import LoginModal from "../modal/login_ modal";

const NavBar = ({ username, logUserOut, isLoggedIn }) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // LEFT OFF FIGURING OUT HOW TO setIsLogin/OpenModal to false after FORM
  // SUBMIT

  useEffect(() => {
    return () => {
      setIsLoginModalOpen(false);
      setIsSignUpModalOpen(false);
    };
  }, [isLoginModalOpen, isSignUpModalOpen]);

  const handleOpenModal = buttonType => {
    buttonType === "signup"
      ? setIsSignUpModalOpen(true)
      : setIsLoginModalOpen(true);
  };

  const buttonTypes = ["signup", "login"];
  console.log(isLoginModalOpen);
  console.log(isSignUpModalOpen);
  return (
    <div className="navbar-container">
      <div className="user-info">Logged in as: {username}</div>
      <div className="log-in-out-buttons">
        {isLoggedIn ? (
          <button onClick={() => logUserOut()}>Logout</button>
        ) : (
          <>
            <button onClick={() => handleOpenModal(buttonTypes[0])}>
              Sign Up
            </button>
            <button onClick={() => handleOpenModal(buttonTypes[1])}>
              Login
            </button>
          </>
        )}
      </div>
      {!isLoggedIn && isSignUpModalOpen ? <SignUpModal /> : <></>}
      {!isLoggedIn && isLoginModalOpen ? <LoginModal /> : <></>}
    </div>
  );
};

export default connect(
  ({ session }) => ({
    username: session.user.username,
    isLoggedIn: session.isAuthenticated
  }),
  dispatch => ({
    logUserOut: () => dispatch(logout())
  })
)(NavBar);
