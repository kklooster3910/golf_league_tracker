import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { handleOutsideClick } from "../../util/utils";

import SignUpForm from "./signup_form";

import "./signupmodal.scss";

const SignUpModal = ({ isSignUpModalOpen, setIsSignUpModalOpen }) => {
  const rootElement = document.getElementById("root");
  const me = useRef(null);

  useEffect(() => {
    rootElement.addEventListener(
      "click",
      handleOutsideClick(me, setIsSignUpModalOpen, isSignUpModalOpen)
    );

    return () => {
      rootElement.removeEventListener(
        "click",
        handleOutsideClick(me, setIsSignUpModalOpen, isSignUpModalOpen)
      );
    };
  }, []);

  return (
    <div className="signupmodal-container" ref={me}>
      <SignUpForm />
    </div>
  );
};

export default connect(null, null)(SignUpModal);
