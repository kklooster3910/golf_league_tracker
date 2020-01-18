import React, { useState } from "react";
import { connect } from "react-redux";

import SignUpForm from "./signup_form";

const SignUpModal = props => {
  return (
    <div className="signupmodal-container">
      <SignUpForm />
    </div>
  );
};

export default connect(null, null)(SignUpModal);
