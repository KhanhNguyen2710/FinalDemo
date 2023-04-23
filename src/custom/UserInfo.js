import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const UserInfo = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUser(user.username);

        // ...
      } else {
        // User is signed out
        setCurrentUser("");
      }
    });
  });

  return currentUser;
};

export default UserInfo;
