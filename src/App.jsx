import React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import { useState, useEffect } from 'react';
import firebase, { provider } from "./firebase";
import Taskform from "./containers/TaskForm";
import InputField from "./components/InputField";

const App = () => {
  
  const [taskInfo, updateTaskInfo] = useState("")
  const [taskStartDate, updateTaskStartDate] = useState("")
  const [taskCompletionDate, updateTaskCompletionDate] = useState("")
  const [taskPicUrl, updateTaskPicUrl] = useState("")

  
  let taskObject = {
    taskInfo: taskInfo,
    taskStartDate: taskStartDate,
    taskCompleteDate: taskCompletionDate,
    taskPicUrl: taskPicUrl,
  }

  const submitFunc = () => {
   console.log(taskObject)
  }

  return (
    <>
    <h1>TaskMASTER</h1>
    <Taskform descriptionFunc={updateTaskInfo} startDateFunc={updateTaskStartDate} completionDateFunc={updateTaskCompletionDate} imageUrlFunc={updateTaskPicUrl} buttonFunc={submitFunc}/>
    <p>{taskObject.taskInfo}</p>  
    <p>{taskObject.taskStartDate}</p>
    <p>{taskObject.taskCompleteDate}</p>
    <p>{taskObject.taskPicUrl}</p>
    </>
    
  );
}

export default App;
