import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import styles from './AddToyForm.module.css'

interface ToyFormInterface {
  name: string;
  color: string;
}

export const AddToyForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    color: yup.string().required('Color is required')
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ToyFormInterface>({ resolver: yupResolver(schema) })

  const toysFbRef = collection(db, 'toys')

  const onAddToy = async (data: ToyFormInterface) => {
    console.log(data)
    await addDoc(toysFbRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    })
    navigate('/toys')
  }

  return (
    <div>
      <h3>Add Toy</h3>
      <form onSubmit={handleSubmit(onAddToy)} className={styles.form}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' {...register('name')} />
        <p style={{ color: 'red' }}>{errors.name?.message}</p>
        <label htmlFor='color'>Color</label>
        <input type='text' id='color' {...register('color')} />
        <p style={{ color: 'red' }}>{errors.color?.message}</p>

        <input type='submit' />
      </form>
    </div>
  )
}
