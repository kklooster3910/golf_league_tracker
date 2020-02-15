import React from "react";

import { Modal, ModalWrapper } from "./modal";

import LoginForm from "../forms/login_form";

const LoginModal = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
  return (
    <div className="modal-container">
      <Modal
        closeModal={() => setIsLoginModalOpen(false)}
        isModalOpen={isLoginModalOpen}
        render={() => (
          <ModalWrapper>
            <LoginForm />
          </ModalWrapper>
        )}
      ></Modal>
    </div>
  );
};

export default LoginModal;
