import React from 'react';
import { auth, provider } from '../config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate('/')
  };

  const logOut = () => {
    signOut(auth);
    console.log('Signed out.')
  }

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <hr />
      <button onClick={logOut}>Sign Out</button>
    </div>
  );
};

export default Login;
