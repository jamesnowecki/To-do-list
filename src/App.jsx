import React from "react";
import styles from "./App.module.scss";
import { useState, useEffect } from "react";
import firebase, { firestore, provider } from "./firebase";
import Taskform from "./containers/TaskForm";
import TaskCard from "./components/TaskCard";
import NavBar from "./containers/NavBar";
import Button from "./components/Button";

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
        <TaskCard item={item} />
        <button className={styles.delete} onClick={() => deleteFromDb(item)}>
          Delete
        </button>
      </div>
    ));
  };

  const checkUserLogin = user ? (
    getItemJsx()
  ) : (
    <p className={styles.notLoggedIn}>Sign in to see your to do list, or start creating one!</p>
  );

  const displayUserNameJSX = user ? (
    <section className={styles.loggedIn}>
      {`Hi ${user.displayName}, here are a list of your tasks:`}
      <Taskform
        descriptionFunc={updateTaskInfo}
        startDateFunc={updateTaskStartDate}
        completionDateFunc={updateTaskCompletionDate}
        buttonFunc={submitFunc}
      />
    </section>
  ) : null;

  return (
    <>
      <NavBar
        user={user}
        signInWithRedirect={signInWithRedirect}
        signOut={signOut}
      />
      <section className={styles.app}>
        <p>{displayUserNameJSX}</p>
        <section className={styles.toDos}>{checkUserLogin}</section>
      </section>
    </>
  );
};

export default App;
