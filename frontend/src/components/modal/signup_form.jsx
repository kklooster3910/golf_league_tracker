import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";

import { signup } from "../../actions/session_actions";

const SignUpForm = ({ registerUser }) => {
  const signUpForm = useRef(null);
  const usernameInput = useRef(null);

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const handleSignUpSubmit = ({ username, email, password }) => {
    const user = {
      username,
      email,
      password
    };
    registerUser(user);
    const signUpFormArray = Array.from(signUpForm.current);
    signUpFormArray.current.forEach(inpt => (inpt.value = ""));
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="sign-up-form"
      ref={signUpForm}
    >
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="username"
        onChange={formik.handleChange}
        value={formik.values.username}
        ref={usernameInput}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default connect(null, dispatch => ({
  registerUser: user => dispatch(signup(user))
}))(SignUpForm);
