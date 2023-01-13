import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

export interface ToyInterface {
  id: string;
  name: string;
  color: string;
  userId: string;
  username: string;
}

export const ToysList = () => {
  return (
    <div>ToysList</div>
  )
}
