import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
// import { useFormik } from "formik";

import { login } from "../../actions/session_actions";
import { resetErrors } from "../../actions/errors_actions";

const LoginForm = ({ loginUser, errors = [], resetErrors }) => {
  const loginForm = useRef(null);
  const usernameInput = useRef(null);
  const [pword, setPword] = useState("");
  const [username, setUsername] = useState("");

  const handleLoginSubmit = () => {
    const user = {
      username,
      pword
    };
    loginUser(user);
    Array.from(loginForm.current).forEach(inpt => (inpt.value = ""));
  };

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const handleInputChange = ({ target }) => {
    switch (target.id) {
      case "username":
        setUsername(target.value);
        break;
      case "password":
        setPword(target.value);
        break;
      default:
    }

    if (errors.length) resetErrors();
  };

  return (
    <form onSubmit={handleLoginSubmit} className="log-in-form" ref={loginForm}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="username"
        onChange={handleInputChange}
        value={username}
        ref={usernameInput}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={handleInputChange}
        value={pword}
      />
      <button type="submit">Login</button>
      <div className="login-errors">
        {!!errors.length && (
          <ul>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        )}
      </div>
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
