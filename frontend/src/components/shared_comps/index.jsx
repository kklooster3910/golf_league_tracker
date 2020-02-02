import React from "react";

import classNames from "classnames";

import "./button.scss";

export const Button = ({ classes = [], action = () => {}, copy }) => {
  const buttonClasses = classNames({
    button: true,
    [classes.join(" ")]: true
  });

  return (
    <div className={buttonClasses}>
      <button onClick={() => action()}>{copy}</button>
    </div>
  );
};

export const Input = ({ type, fieldParams }) => {
  let returnField;
  switch (type) {
    case "input":
      returnField = <input {...{ ...fieldParams }} />;
    default:
      break;
  }
  return <>{returnField}</>;
};
