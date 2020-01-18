import React, { useState, useEffect, useReducer } from "react";
import { connect } from "react-redux";

import { logout } from "../../actions/session_actions";
import SignUpModal from "../modal/signup_modal";
import LoginModal from "../modal/login_ modal";

import "./navbar.scss";

const NavBar = ({ username, logUserOut, isLoggedIn }) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoginModalOpen(false);
      setIsSignUpModalOpen(false);
    };
  }, [isLoggedIn]);

  const handleOpenModal = buttonType => {
    buttonType === "signup"
      ? setIsSignUpModalOpen(true)
      : setIsLoginModalOpen(true);
  };

  const renderSignInModal = () =>
    !isLoggedIn && isSignUpModalOpen ? (
      <div className="signup-modal-container">
        <SignUpModal />
      </div>
    ) : (
      <></>
    );

  const renderLoginModal = () =>
    !isLoggedIn && isLoginModalOpen ? (
      <div className="login-modal-container">
        <LoginModal />
      </div>
    ) : (
      <></>
    );

  const buttonTypes = ["signup", "login"];

  return (
    <>
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
      </div>
      {renderLoginModal()}
      {renderSignInModal()}
    </>
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
