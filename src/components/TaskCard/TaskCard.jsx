import React from "react";
import styles from "./TaskCard.module.scss";

const TaskCard = ({props}) => {

  const { taskCompletionDate, taskInfo, taskPicUrl, taskStartDate } = props;

  return (
    <>
      <p>Task: {taskInfo}</p>
      <p>Start Date: {taskStartDate}</p>
      <p>Completion Date: {taskCompletionDate}</p>
      <img src={taskPicUrl} alt="Task Pic"/>
    </>
  );
};

export default TaskCard;
