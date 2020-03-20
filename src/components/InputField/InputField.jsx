import React from "react";
import styles from "./InputField.module.scss";

const InputField = (props) => {

  const {type, placeholder, handleInput} = props
  return (
    <>
      <input type={type} placeholder={placeholder} onChange={event => handleInput(event.target.value)} />
    </>
  );
};

export default InputField;
