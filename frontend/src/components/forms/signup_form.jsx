import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";

import { signup } from "../../actions/session";
import { resetErrors } from "../../actions/errors";

import { Button, Input, Header, renderErrors } from "../shared_comps";

import "./form.scss";

const SignUpForm = ({ signup, errors = [], resetErrors }) => {
  const signUpForm = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const emailInput = useRef(null);

  useEffect(() => {
    resetErrors();
    usernameInput.current.focus();

    return () => {
      resetErrors();
    };
  }, []);

  useEffect(() => {
    usernameInput.current.addEventListener("input", () => resetErrors());
    emailInput.current.addEventListener("input", () => resetErrors());
    passwordInput.current.addEventListener("input", () => resetErrors());

    return () => {
      usernameInput.current.removeEventListener("input", () => resetErrors());
      emailInput.current.removeEventListener("input", () => resetErrors());
      passwordInput.current.removeEventListener("input", () => resetErrors());
    };
  }, []);

  const handleSignUpSubmit = ({ username, email, password }) => {
    const user = {
      username,
      email,
      password
    };
    signup(user);
    Array.from(signUpForm.current).forEach(input => (input.value = ""));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    onSubmit: values => {
      handleSignUpSubmit(values);
    }
  });

  const usernameInputParams = {
    type: "input",
    classes: ["username"],
    fieldParams: {
      id: "username",
      name: "username",
      type: "username",
      onChange: formik.handleChange,
      value: formik.values.username,
      ref: usernameInput
    }
  };
  const emailInputParams = {
    type: "input",
    classes: ["email"],
    fieldParams: {
      id: "email",
      name: "email",
      type: "email",
      onChange: formik.handleChange,
      value: formik.values.email,
      ref: emailInput
    }
  };
  const passwordInputParams = {
    type: "input",
    classes: ["password"],
    fieldParams: {
      id: "password",
      name: "password",
      type: "password",
      onChange: formik.handleChange,
      value: formik.values.password,
      ref: passwordInput
    }
  };

  return (
    <>
      <Header copy="Sign Up" classes={["signup-modal"]} />
      <form onSubmit={formik.handleSubmit} className="form" ref={signUpForm}>
        <div className="inputs-container">
          <div className="input-container">
            <label htmlFor="username">Username: </label>
            <Input {...{ ...usernameInputParams }} />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email: </label>
            <Input {...{ ...emailInputParams }} />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password: </label>
            <Input {...{ ...passwordInputParams }} />
          </div>
        </div>
        <Button copy="Sign Up" />
      </form>
      <div className="errors">{renderErrors(errors)}</div>
    </>
  );
};

export default connect(
  ({ errors }) => ({ errors: Object.values(errors.session) }),
  { signup, resetErrors }
)(SignUpForm);
