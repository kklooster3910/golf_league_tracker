import React, { useEffect } from "react";

import classNames from "classnames";

import "./modal.scss";

export const Modal = props => {
  const { render, isModalOpen, customClass, closeModal } = props;

  const modalClasses = classNames({
    [customClass]: customClass,
    modal: true,
    visible: isModalOpen
  });

  // TRY AND WRITE A QUICK FUNC/EVENT LISTENER
  // THAT goes for the html/body and freezes y scroll
  // so you can't scroll the background when the modal
  // is open

  // useEffect(() => {
  //   // document
  // }, []);

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
