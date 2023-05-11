import { onAuthStateChanged } from 'firebase/auth';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { auth } from '../firebase';

const Auth = () => {
 const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  });

  return {
    currentUser
  }
}

export default Auth