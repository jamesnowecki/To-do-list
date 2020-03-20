import React from "react";
import styles from "./TaskForm.module.scss";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

const TaskForm = (props) => {

  const {descriptionFunc, startDateFunc, completionDateFunc, imageUrlFunc, buttonFunc} = props;

  return (
    <>
      <InputField type="text" placeholder="Task description" handleInput={descriptionFunc} />
      <InputField type="text" placeholder="Task description" handleInput={startDateFunc} />
      <InputField type="text" placeholder="Task description" handleInput={completionDateFunc} />
      <InputField type="text" placeholder="Task description" handleInput={imageUrlFunc} />
      <Button btnText="Submit" handleClick={buttonFunc} />
    </>
  );
};

export default TaskForm;
