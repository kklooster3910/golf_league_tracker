import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";

import { signup } from "../../actions/session_actions";
import { resetErrors } from "../../actions/errors_actions";

import { Button, Input } from "../shared_comps";

import "./signupform.scss";

const SignUpForm = ({ registerUser, errors = [], resetErrors }) => {
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
    registerUser(user);
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
      className="sign-up-form"
      ref={signUpForm}
    >
      <label htmlFor="username">Username</label>
      <Input {...{ ...usernameInputParams }} />
      <label htmlFor="email">Email</label>
      <Input {...{ ...emailInputParams }} />
      <label htmlFor="password">Password</label>
      <Input {...{ ...passwordInputParams }} />
      <Button copy="Sign Up" />
      <div className="signup-errors">{renderErrors()}</div>
    </form>
  );
};

export default connect(
  ({ errors }) => ({ errors: Object.values(errors.session) }),
  dispatch => ({
    registerUser: user => dispatch(signup(user)),
    resetErrors: () => dispatch(resetErrors())
  })
)(SignUpForm);
