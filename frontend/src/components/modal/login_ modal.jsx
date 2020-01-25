import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import { handleOutsideClick } from "../../util/utils";

import LoginForm from "./login_form";

const LoginModal = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
  const me = useRef(null);
  const rootElement = document.getElementById("root");

  useEffect(() => {
    rootElement.addEventListener(
      "click",
      handleOutsideClick(me, setIsLoginModalOpen, isLoginModalOpen)
    );

    return () => {
      rootElement.removeEventListener(
        "click",
        handleOutsideClick(me, setIsLoginModalOpen, isLoginModalOpen)
      );
    };
  });

  return (
    <div className="login-modal-container" ref={me}>
      <LoginForm />
    </div>
  );
};

export default connect(null, null)(LoginModal);
