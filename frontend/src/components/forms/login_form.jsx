import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";

import { login } from "../../actions/session";
import { resetErrors } from "../../actions/errors";
import { Button, Input, Header, renderErrors } from "../shared_comps";

import "./form.scss";

const LoginForm = ({ login, errors = [], resetErrors }) => {
  const loginForm = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const handleLoginSubmit = ({ username, password }) => {
    const user = {
      username,
      password
    };
    login(user);
    Array.from(loginForm.current).forEach(inpt => (inpt.value = ""));
  };

  useEffect(() => {
    resetErrors();
    usernameInput.current.focus();

    return () => {
      resetErrors();
    };
  }, []);

  useEffect(() => {
    usernameInput.current.addEventListener("input", () => resetErrors());
    passwordInput.current.addEventListener("input", () => resetErrors());

    return () => {
      usernameInput.current.removeEventListener("input", () => resetErrors());
      passwordInput.current.removeEventListener("input", () => resetErrors());
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: values => {
      handleLoginSubmit(values);
    }
  });

  const usernameInputParams = {
    type: "input",
    fieldParams: {
      id: "username",
      name: "username",
      type: "username",
      onChange: formik.handleChange,
      value: formik.values.username,
      ref: usernameInput
    }
  };
  const passwordInputParams = {
    type: "input",
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
      <Header copy="Login" classes={["login-modal"]} />
      <form onSubmit={formik.handleSubmit} className="form" ref={loginForm}>
        <div className="inputs-container">
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <Input {...{ ...usernameInputParams }} />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <Input {...{ ...passwordInputParams }} />
          </div>
        </div>
        <Button copy="Login" />
        <div className="errors">{renderErrors(errors)}</div>
      </form>
    </>
  );
};

export default connect(
  ({ errors }) => ({ errors: Object.values(errors.session) }),
  {
    login,
    resetErrors
  }
)(LoginForm);
