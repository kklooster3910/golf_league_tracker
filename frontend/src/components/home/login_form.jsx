import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";

import { login } from "../../actions/session_actions";

const LoginForm = ({ loginUser }) => {
  const handleLoginSubmit = ({ username, password }) => {
    const user = {
      username,
      password
    };
    loginUser(user);
  };

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
    <form onSubmit={formik.handleSubmit} className="log-in-form">
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="username"
        onChange={formik.handleChange}
        value={formik.values.username}
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
