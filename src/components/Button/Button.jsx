import React from "react";
import styles from "./Button.module.scss";

const Button = (props) => {

  const {btnText, handleClick} = props;

  return (
    <>
      <button onClick={handleClick}>{btnText}</button>
    </>
  );
};

export default Button;
