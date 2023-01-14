import { IPost } from '../pages/Main';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
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
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  const onAddLike = async () => {
    try {
      const newDoc = await addDoc(likesFbRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onRemoveLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesFbRef,
        where('postId', '==', post.id),
        where('userId', '==', user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, 'likes', likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
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
      <button onClick={hasUserLiked ? onRemoveLike : onAddLike}>
        {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
      </button>
      {likes ? <p>Likes: {likes?.length} </p> : ''}
    </li>
  );
}
