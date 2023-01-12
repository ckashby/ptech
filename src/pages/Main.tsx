import { auth } from '../config/firebase';

export default function Main() {
  return (
    <div>
      <h2>Home Page</h2>
      <p>
        Welcome {auth.currentUser?.displayName}{' '}
        <img
          src={auth.currentUser?.photoURL || ''}
          alt="profile pic"
          width="100px"
          height="100px"
        />
      </p>
      {auth.currentUser?.email}
    </div>
  );
}
