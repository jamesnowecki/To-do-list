import React from "react";
import styles from "./App.module.scss";
import { useState, useEffect } from "react";
import firebase, { firestore, provider } from "./firebase";
import Taskform from "./containers/TaskForm";
import TaskCard from "./components/TaskCard";
import NavBar from "./containers/NavBar";

const App = () => {
  const [databaseDetails, updateDatabaseDetails] = useState([]);
  const [taskInfo, updateTaskInfo] = useState("");
  const [taskStartDate, updateTaskStartDate] = useState("");
  const [taskCompletionDate, updateTaskCompletionDate] = useState("");

  const [user, setUser] = useState(null);

  const signInWithRedirect = () => {
    firebase.auth().signInWithRedirect(provider);
  };

  const getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
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
      .catch((error) => {
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
  };

  const fetchDBDetails = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const retrievedItems = doc.data().toDoList;
          updateDatabaseDetails(retrievedItems);
        }
      });
  };

  const addToDb = () => {
    const newItems = [taskObject, ...databaseDetails];

    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        toDoList: newItems,
      })
      .then(() => {
        fetchDBDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFromDb = (item) => {
    const newArray = [...databaseDetails];
    const position = newArray.indexOf(item);
    newArray.splice(position, 1);

    const newDoc = {
      toDoList: newArray,
    };

    firestore
      .collection("users")
      .doc(user.uid)
      .set(newDoc)
      .then(() => {
        fetchDBDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitFunc = () => {
    addToDb();
  };

  const getItemJsx = () => {
    return databaseDetails.map((item) => (
      <div key={item.taskInfo + item.taskStartDate}>
        <TaskCard props={item} />
        <button onClick={() => deleteFromDb(item)}>Delete Task</button>
      </div>
    ));
  };

  const checkUserLogin = user ? (
    getItemJsx()
  ) : (
    <p>Login to see your to do list</p>
  );

  const displayUserNameJSX = user ? (
    <>
      {`Hi ${user.displayName}, here are a list of your tasks:`}
      <Taskform
        descriptionFunc={updateTaskInfo}
        startDateFunc={updateTaskStartDate}
        completionDateFunc={updateTaskCompletionDate}
        buttonFunc={submitFunc}
      />
    </>
  ) : null;

  return (
    <section className={styles.app}>
      <NavBar
        user={user}
        signInWithRedirect={signInWithRedirect}
        signOut={signOut}
      />
      <p>{displayUserNameJSX}</p>
      {checkUserLogin}
    </section>
  );
};

export default App;
