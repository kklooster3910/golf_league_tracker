import React, { useState } from "react";
import { connect } from "react-redux";

import LoginForm from "../home/login_form.jsx";

const LoginModal = props => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default connect(null, null)(LoginModal);
