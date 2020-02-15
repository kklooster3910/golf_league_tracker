import React from "react";

import classNames from "classnames";

import "./button.scss";
import "./header.scss";
import "./input.scss";

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

export const Input = ({ type, fieldParams, classes = [] }) => {
  const className = classNames({
    input: true,
    [classes.join(" ")]: true
  });

  let returnField;
  switch (type) {
    case "input":
      returnField = <input {...{ ...fieldParams, className }} />;
    default:
      break;
  }
  return <>{returnField}</>;
};

export const Header = ({ copy, classes = [] }) => {
  const headerClasses = classNames({
    header: true,
    [classes.join(" ")]: true
  });

  return (
    <div className={headerClasses}>
      <h1>{copy}</h1>
    </div>
  );
};

export const renderErrors = errorsArray =>
  !!errorsArray.length && (
    <ul>
      {errorsArray.map((e, i) => (
        <li key={i}>{e}</li>
      ))}
    </ul>
  );
