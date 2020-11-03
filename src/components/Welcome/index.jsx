import React, { useState, useEffect, useContext } from "react";
import Logout from "../Logout";
import Quiz from "../Quiz";
import { FirebaseContext } from "../Firebase";

const Welcome = (props) => {
  const firebase = useContext(FirebaseContext);
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/");
    });

    if (!!userSession) {
      firebase
        .user(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setUserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      listener();
    };
  }, [firebase, props, userSession]);

  return userSession === null ? (
    <>
      <div className="loader"></div>
      <p style={{ color: "#fff" }}>Chargement...</p>
    </>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
