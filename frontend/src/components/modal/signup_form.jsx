import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
// import { useFormik } from "formik";

import { signup } from "../../actions/session_actions";
import { resetErrors } from "../../actions/errors_actions";

import "./signupform.scss";

const SignUpForm = ({ registerUser, errors = [], resetErrors }) => {
  const signUpForm = useRef(null);
  const usernameInput = useRef(null);
  const [pword, setPword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const handleSignUpSubmit = () => {
    const user = {
      username,
      email,
      password: pword
    };
    registerUser(user);
    Array.from(signUpForm.current).forEach(input => (input.value = ""));
  };

  const handleInputChange = ({ target }) => {
    switch (target.id) {
      case "password":
        setPword(target.value);
        break;
      case "username":
        setUsername(target.value);
        break;
      case "email":
        setEmail(target.value);
        break;
      default:
    }
    if (errors.length) resetErrors();
  };

  return (
    <form
      onSubmit={handleSignUpSubmit}
      className="sign-up-form"
      ref={signUpForm}
    >
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="username"
        onChange={handleInputChange}
        value={username}
        ref={usernameInput}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={handleInputChange}
        value={email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={handleInputChange}
        value={pword}
      />
      <button type="submit">Sign Up</button>
      <div className="signup-errors">
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
    registerUser: user => dispatch(signup(user)),
    resetErrors: () => dispatch(resetErrors())
  })
)(SignUpForm);
