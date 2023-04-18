import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const UserInfo = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setCurrentUser(user);

        // ...
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    });
  });

  return currentUser;
};

export default UserInfo;
