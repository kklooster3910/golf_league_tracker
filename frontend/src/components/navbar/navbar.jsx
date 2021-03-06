import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { logout } from "../../actions/session_actions";
import SignUpModal from "../modal/signup_modal";
import LoginModal from "../modal/login_ modal";

import "./navbar.scss";

// FIGURE OUT HOW YOU'RE GOING TO GET THE MODAL TO APPEAR AND HAVE THE
// BACKGROUND DARKEN YOU LOSER

// and do some styling bruh... why do you hate it so much

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
    !isLoggedIn &&
    isSignUpModalOpen && (
      <div className="signup-modal-container">
        <SignUpModal
          isSignUpModalOpen={isSignUpModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
        />
      </div>
    );

  const renderLoginModal = () =>
    !isLoggedIn &&
    isLoginModalOpen && (
      <div className="login-modal-container">
        <LoginModal
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
      </div>
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
