import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePetForm.module.css';

interface PetFormData {
  name: string;
  species: string;
  breed: string;
}

export const CreatePetForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required('Name is required.').min(3).max(12),
    species: yup.string().required('Species is required'),
    breed: yup.string().required('Breed is required.'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PetFormData>({ resolver: yupResolver(schema) });

  const petsFbRef = collection(db, 'pets');

  const onCreatePet = async (data: PetFormData) => {
    console.log(data);
    await addDoc(petsFbRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate('/pets');
  };

  return (
    <div>
      <h3>Add New Pet</h3>
      <form onSubmit={handleSubmit(onCreatePet)} className={styles.form}>
        <input type="text" {...register('name')} />
        <p style={{ color: 'red' }}>{errors.name?.message}</p>
        <input type="text" {...register('species')} />
        <p style={{ color: 'red' }}>{errors.species?.message}</p>
        <input type="text" {...register('breed')} />
        <p style={{ color: 'red' }}>{errors.breed?.message}</p>

        <input type="submit" />
      </form>
    </div>
  );
};
