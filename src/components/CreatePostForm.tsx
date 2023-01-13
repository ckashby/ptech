import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePostForm.module.css';

interface CreateFormData {
  title: string;
  body: string;
}

export default function CreatePostForm() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required('Title for post is required.').min(3).max(15),
    body: yup.string().required('Min of 5 characters...').min(3).max(50),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, 'posts');

  const onCreatePost = async (data: CreateFormData) => {
    // console.log(data);
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate('/');
  };

  return (
    <div>
      <h3>Create Post</h3>
      <form onSubmit={handleSubmit(onCreatePost)} className={styles.form}>
        <input type="text" {...register('title')} />
        <p style={{ color: 'red' }}>{errors.title?.message}</p>
        <textarea rows={5} {...register('body')} />
        <p style={{ color: 'red' }}>{errors.body?.message}</p>

        <input type="submit" />
      </form>
    </div>
  );
}
