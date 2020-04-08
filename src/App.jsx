import React from 'react';
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

  const [user, setUser] = useState(null);

  const signInWithRedirect = () => {
    firebase.auth().signInWithRedirect(provider);
  };

  const getUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        alert("You have signed out");
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, [user]);

  
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
    <button onClick={() => signInWithRedirect()}>Sign in</button>
    <button onClick={() => signOut()}>Sign out</button>

    <Taskform descriptionFunc={updateTaskInfo} startDateFunc={updateTaskStartDate} completionDateFunc={updateTaskCompletionDate} imageUrlFunc={updateTaskPicUrl} buttonFunc={submitFunc}/>
    {getItemJsx()}
    </>
    
  );
}

export default App;
