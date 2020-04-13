import React from "react";
import styles from "./TaskCard.module.scss";
import Button from "../Button";

const TaskCard = ({item}) => {

  const { taskCompletionDate, taskInfo, taskStartDate} = item;

  return (
    <div className={styles.taskCard}>
      <p>Task: {taskInfo}</p>
      <p>Start Date: {taskStartDate}</p>
      <p>Completion Date: {taskCompletionDate}</p>
    </div>
  );
};

export default TaskCard;
