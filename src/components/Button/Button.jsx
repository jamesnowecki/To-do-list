import React from "react";
import styles from "./Button.module.scss";

const Button = (props) => {

  const {btnText, handleClick} = props;

  return (
    <div className={styles.button}>
      <button onClick={() => {handleClick()}}>{btnText}</button>
    </div>
  );
};

export default Button;
