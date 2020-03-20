import React from "react";
import styles from "./TaskForm.module.scss";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

const TaskForm = (props) => {

  const {descriptionFunc, startDateFunc, completionDateFunc, imageUrlFunc, buttonFunc} = props;

  return (
    <>
      <InputField type="text" placeholder="Task description" handleInput={descriptionFunc} />
      <InputField type="text" placeholder="Start Date" handleInput={startDateFunc} />
      <InputField type="text" placeholder="Completion Date" handleInput={completionDateFunc} />
      <InputField type="text" placeholder="Image Url" handleInput={imageUrlFunc} />
      <Button btnText="Submit" handleClick={buttonFunc} />
    </>
  );
};

export default TaskForm;
