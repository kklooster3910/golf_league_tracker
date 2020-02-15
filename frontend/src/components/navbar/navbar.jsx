import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { logout } from "../../actions/session";
import SignUpModal from "../modal/signup_modal";
import LoginModal from "../modal/login_ modal";
import { Button } from "../shared_comps";

import "./navbar.scss";

const NavBar = ({ username, logout, isLoggedIn }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const renderSignInModal = () =>
    !isLoggedIn &&
    isSignUpModalOpen && (
      <SignUpModal
        isSignUpModalOpen={isSignUpModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
      />
    );

  const renderLoginModal = () =>
    !isLoggedIn &&
    isLoginModalOpen && (
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
    );

  return (
    <>
      <div className="navbar-container">
        <div className="user-info">
          {isLoggedIn && `Logged in as: ${username}`}
        </div>
        <div className="log-in-out-buttons">
          {isLoggedIn ? (
            <Button
              action={() => logout()}
              copy="Logout"
              classes={["logout"]}
            />
          ) : (
            <>
              <Button
                action={() => setIsSignUpModalOpen(true)}
                copy="SignUp"
                classes={["signup"]}
              />
              <Button
                action={() => setIsLoginModalOpen(true)}
                copy="Login"
                classes={["login"]}
              />
            </>
          )}
        </div>
      </div>
      {renderSignInModal()}
      {renderLoginModal()}
    </>
  );
};

export default connect(
  ({ session }) => ({
    username: session.user.username,
    isLoggedIn: session.isAuthenticated
  }),
  { logout }
)(NavBar);
