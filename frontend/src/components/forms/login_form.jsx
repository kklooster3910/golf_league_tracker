import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";

import { login } from "../../actions/session_actions";
import { resetErrors } from "../../actions/errors_actions";
import { Button, Input } from "../shared_comps";

const LoginForm = ({ loginUser, errors = [], resetErrors }) => {
  const loginForm = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const handleLoginSubmit = ({ username, password }) => {
    const user = {
      username,
      password
    };
    loginUser(user);
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

  const renderErrors = () =>
    !!errors.length && (
      <ul>
        {errors.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="log-in-form"
      ref={loginForm}
    >
      <label htmlFor="username">Username</label>
      <Input {...{ ...usernameInputParams }} />
      <label htmlFor="password">Password</label>
      <Input {...{ ...passwordInputParams }} />
      <Button copy="Login" />
      <div className="login-errors">{renderErrors()}</div>
    </form>
  );
};

export default connect(
  ({ errors }) => ({ errors: Object.values(errors.session) }),
  dispatch => ({
    loginUser: user => dispatch(login(user)),
    resetErrors: () => dispatch(resetErrors())
  })
)(LoginForm);
