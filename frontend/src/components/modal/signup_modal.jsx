import React, { useState } from "react";
import { connect } from "react-redux";

import SignUpForm from "./signup_form";

const SignUpModal = props => {
  return (
    <>
      <SignUpForm />
    </>
  );
};

export default connect(null, null)(SignUpModal);
