import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Toy } from '../components/Toy';

export interface ToyInterface {
  id: string;
  name: string;
  color: string;
  userId: string;
  username: string;
}

export const ToysList = () => {
  const [toyList, setToyList] = useState<ToyInterface[] | null>(null);
  const toysFbRef = collection(db, 'toys');

  const getToys = async () => {
    const data = await getDocs(toysFbRef);
    // console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    setToyList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ToyInterface[]
    );
  };

  useEffect(() => {
    getToys();
  }, []);

  return (
    <div>
      <h3>Toys List</h3>
      <ul>
        {toyList?.map((toy) => (
          <Toy toy={toy} />
        ))}
      </ul>
    </div>
  );
};
