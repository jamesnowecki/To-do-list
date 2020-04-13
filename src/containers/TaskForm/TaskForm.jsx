import React from "react";
import styles from "./TaskForm.module.scss";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

const TaskForm = (props) => {
  const {
    descriptionFunc,
    startDateFunc,
    completionDateFunc,
    buttonFunc,
  } = props;

  return (
    <div className={styles.taskForm}>
      <p>Input a new task here:</p>
      <InputField
        type="text"
        placeholder="Task description"
        handleInput={descriptionFunc}
      />
      <InputField
        type="text"
        placeholder="Start Date"
        handleInput={startDateFunc}
      />
      <InputField
        type="text"
        placeholder="Completion Date"
        handleInput={completionDateFunc}
      />
      <div className={styles.submit}>
        <Button btnText="Submit" handleClick={buttonFunc} />
      </div>
    </div>
  );
};

export default TaskForm;
