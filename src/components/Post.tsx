import { IPost } from '../pages/Main';
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
  post: IPost;
}

interface Like {
  userId: string;
}

export default function Post(props: Props) {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesFbRef = collection(db, 'likes');

  const likesDoc = query(likesFbRef, where('postId', '==', post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  const onAddLike = async () => {
    try {
      await addDoc(likesFbRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onRemoveLike = async () => {
    try {
      await addDoc(likesFbRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <li>
      <h4>{post.title}</h4>
      <p>
        {post.body} - @{post.username}
      </p>
      <button onClick={onAddLike}>
        {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
      </button>
      {likes ? <p>Likes: {likes?.length} </p> : ''}
    </li>
  );
}
