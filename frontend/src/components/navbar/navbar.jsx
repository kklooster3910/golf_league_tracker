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
    // should I remove this when I make it so that you redirect after
    // logging in?
    return () => {
      setIsLoginModalOpen(false);
      setIsSignUpModalOpen(false);
    };
  }, [isLoggedIn]);

  const renderSignInModal = () =>
    !isLoggedIn && isSignUpModalOpen ? (
      <div className="signup-modal-container">
        <SignUpModal
          isSignUpModalOpen={isSignUpModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
        />
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
              <button onClick={() => setIsSignUpModalOpen(true)}>
                Sign Up
              </button>
              <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
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
