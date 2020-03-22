import React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import { useState, useEffect } from 'react';
import firebase, { firestore, provider } from "./firebase";
import Taskform from "./containers/TaskForm";
import TaskCard from "./components/TaskCard";

const App = () => {
  
  const [databaseDetails, updateDatabaseDetails] = useState([]);
  const [taskInfo, updateTaskInfo] = useState("");
  const [taskStartDate, updateTaskStartDate] = useState("");
  const [taskCompletionDate, updateTaskCompletionDate] = useState("");
  const [taskPicUrl, updateTaskPicUrl] = useState("");

  
  useEffect(() => {fetchDBDetails()}, []);

  let taskObject = {
    taskInfo: taskInfo,
    taskStartDate: taskStartDate,
    taskCompletionDate: taskCompletionDate,
    taskPicUrl: taskPicUrl,
  }

  const fetchDBDetails = () => {
    firestore
      .collection("users")
      .doc("UQm8ea6gDdoIStNcISy3")
      .get()
      .then(doc => {
        const retrievedItems = doc.data().toDoList;
        updateDatabaseDetails(retrievedItems);
      })
  }
 
  const addToDb = () => {
    const newItems = [taskObject, ...databaseDetails]

    firestore
    .collection("users")
    .doc("UQm8ea6gDdoIStNcISy3")
    .set({
      toDoList: newItems})
    .then(() => {fetchDBDetails();
    })
    .catch(err => {
      console.log(err);
    });
  };

  const deleteFromDb = item => {
    const newArray = [...databaseDetails];
    const position = newArray.indexOf(item);
    newArray.splice(position, 1);

    const newDoc = {
      toDoList: newArray
    };

    firestore
    .collection("users")
    .doc("UQm8ea6gDdoIStNcISy3")
    .set(newDoc)
    .then(() => {
      fetchDBDetails();
    })
    .catch(err => {
      console.log(err)
    });
  };

  const getItemJsx = () => {
    return databaseDetails.map(item => (
      <>
      {console.log(item)}
      <TaskCard props={item}/>
      <button onClick={() => deleteFromDb(item)}>Delete Task</button>
      </>
    ));
  }


  const submitFunc = () => {
   addToDb();
  }

  return (
    <>
    <h1>TaskMASTER</h1>
    <Taskform descriptionFunc={updateTaskInfo} startDateFunc={updateTaskStartDate} completionDateFunc={updateTaskCompletionDate} imageUrlFunc={updateTaskPicUrl} buttonFunc={submitFunc}/>
    {getItemJsx()}
    </>
    
  );
}

export default App;
