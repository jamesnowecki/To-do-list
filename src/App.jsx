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
        fetchDBDetails();
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

  
  // useEffect(() => {fetchDBDetails()}, []);

  let taskObject = {
    taskInfo: taskInfo,
    taskStartDate: taskStartDate,
    taskCompletionDate: taskCompletionDate,
    taskPicUrl: taskPicUrl,
  }

  const fetchDBDetails = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        if (doc.exists) {

        const retrievedItems = doc.data().toDoList;
        updateDatabaseDetails(retrievedItems);
        }
      })
  }
 
  const addToDb = () => {
    const newItems = [taskObject, ...databaseDetails]

    firestore
    .collection("users")
    .doc(user.uid)
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
    .doc(user.uid)
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
      <div key={(item.taskInfo + item.taskStartDate)}>
      <TaskCard props={item}/>
      <button onClick={() => deleteFromDb(item)}>Delete Task</button>
      </div>
    ));
  }

  const checkUserLogin = user ? getItemJsx() : <p>Login to see your to do list</p> 


  const submitFunc = () => {
   addToDb();
  }

  const displayUserNameJSX = user ? (console.log(user), `Hi ${user.displayName}`) : null;

  //user.providerData[0].uid
  return (
    <>
    <h1>TaskMASTER</h1>
    <button onClick={() => signInWithRedirect()}>Sign in</button>
    <button onClick={() => signOut()}>Sign out</button>
    <p>{displayUserNameJSX}</p>

    <Taskform descriptionFunc={updateTaskInfo} startDateFunc={updateTaskStartDate} completionDateFunc={updateTaskCompletionDate} imageUrlFunc={updateTaskPicUrl} buttonFunc={submitFunc}/>
    {checkUserLogin}
    </>
    
  );
}

export default App;
