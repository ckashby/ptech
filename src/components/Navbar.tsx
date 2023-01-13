import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const navigator = useNavigate();

  const signUserOut = () => {
    signOut(auth);
    navigator('/');
  };

  return (
    <div className={styles.navbar}>
      <Link to="/">Home</Link>
      {user ? <Link to="/pets">Pets</Link> : ''}
      {user ? <Link to="/create-pet">Add Pet</Link> : ''}
      {user ? <Link to="/create-post">Create Post</Link> : ''}
      {!user && <Link to="/login">Login</Link>}
      {user && (
        <>
          <span>{user?.email}</span>
          <button onClick={signUserOut}>Log Out</button>
        </>
      )}
    </div>
  );
}
