import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";

import { login } from "../../actions/session_actions";

const LoginForm = ({ loginUser }) => {
  const loginForm = useRef(null);
  const usernameInput = useRef(null);

  const handleLoginSubmit = ({ username, password }) => {
    const user = {
      username,
      password
    };
    loginUser(user);
    Array.from(loginForm.current).forEach(inpt => (inpt.value = ""));
  };

  useEffect(() => {
    usernameInput.current.focus();
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="log-in-form"
      ref={loginForm}
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
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default connect(null, dispatch => ({
  loginUser: user => dispatch(login(user))
}))(LoginForm);
