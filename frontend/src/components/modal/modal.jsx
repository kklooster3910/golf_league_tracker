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

  useEffect(() => {
    if (isModalOpen) {
      document.getRootNode().children[0].classList.add("freezeBackground");
      document.querySelector("body").classList.add("freezeBackground");
    }
    return () => {
      document.getRootNode().children[0].classList.remove("freezeBackground");
      document.querySelector("body").classList.remove("freezeBackground");
    };
  }, [isModalOpen]);

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
