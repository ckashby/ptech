import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Pet } from '../components/Pet';

export interface PetInterface {
  id: string;
  species: string;
  gender: string;
  name: string;
  breed: string;
  username: string;
  userId: string;
}

export const PetsList = () => {
  const [petList, setPetList] = useState<PetInterface[] | null>(null);
  const petsRef = collection(db, 'pets');

  const getPets = async () => {
    const data = await getDocs(petsRef);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setPetList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PetInterface[]
    );
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div>
      <h3>Pets List</h3>
      <ul>
        {petList?.map((pet) => (
          <Pet pet={pet} />
        ))}
      </ul>
    </div>
  );
};
