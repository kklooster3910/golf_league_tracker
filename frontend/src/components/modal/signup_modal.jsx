import React from "react";

import { Modal, ModalWrapper } from "./modal";

import SignUpForm from "../forms/signup_form";

const SignUpModal = ({ isSignUpModalOpen, setIsSignUpModalOpen }) => {
  return (
    <div className="modal-container">
      <Modal
        closeModal={() => setIsSignUpModalOpen(false)}
        isModalOpen={isSignUpModalOpen}
        render={() => (
          <ModalWrapper>
            <SignUpForm />
          </ModalWrapper>
        )}
      ></Modal>
    </div>
  );
};

export default SignUpModal;
