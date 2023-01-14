import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import Post from '../components/Post';
export interface IPost {
  id: string;
  title: string;
  body: string;
  userId: string;
  username: string;
}

export default function Main() {
  const [postsList, setPostsList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, 'posts');

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h2>Welcome Page</h2>
      <p>
        <img
          src={auth.currentUser?.photoURL || ''}
          alt="profile pic"
          width="100px"
          height="100px"
        />
      </p>
      <hr />
      <ul>
        {postsList?.map((post) => (
          <Post post={post} />
        ))}
      </ul>
    </div>
  );
}
