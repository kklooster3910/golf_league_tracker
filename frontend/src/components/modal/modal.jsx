import React from "react";

import classNames from "classnames";

import "./modal.scss";

export const Modal = props => {
  const { render, isModalOpen, customClass, closeModal } = props;

  const modalClasses = classNames({
    [customClass]: customClass,
    modal: true,
    visible: isModalOpen
  });

  return (
    <div className={modalClasses}>
      {render({ ...props })}
      <div className="modal-overlay" onClick={() => closeModal()} />
    </div>
  );
};

export const ModalWrapper = ({ children }) => (
  <div className="content-container">{children}</div>
);
