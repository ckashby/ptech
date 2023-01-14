import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface IGameForm {
  name: string;
}

export const AddGameForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required('Name of game is required'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IGameForm>({ resolver: yupResolver(schema) });

  const gamesFbRef = collection(db, 'games');

  const onAddGame = async (data: IGameForm) => {
    // console.log(data);
    await addDoc(gamesFbRef, {
      ...data,
      userId: user?.uid,
      username: user?.displayName,
    });
    navigate('/games');
  };

  return (
    <div>
      <h3>Add Game</h3>
      <form onSubmit={handleSubmit(onAddGame)}>
        <label htmlFor="name">Name of game</label>
        <input type="text" id="name" {...register('name')} />
        <p style={{ color: 'red' }}>{errors.name?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
};
