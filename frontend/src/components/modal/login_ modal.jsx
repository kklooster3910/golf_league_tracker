import React from "react";
import { connect } from "react-redux";

import LoginForm from "./login_form";

const LoginModal = props => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default connect(null, null)(LoginModal);
