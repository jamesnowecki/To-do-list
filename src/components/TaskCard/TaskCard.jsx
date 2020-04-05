import React from "react";
import styles from "./TaskCard.module.scss";

const TaskCard = ({props}) => {

  const { taskCompletionDate, taskInfo, taskPicUrl, taskStartDate } = props;

  return (
    <div className={styles.taskCard}>
      <p>Task: {taskInfo}</p>
      <p>Start Date: {taskStartDate}</p>
      <p>Completion Date: {taskCompletionDate}</p>
      <img src={taskPicUrl} alt="Task Pic"/>
    </div>
  );
};

export default TaskCard;
