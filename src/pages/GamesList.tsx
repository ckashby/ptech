import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import { Game } from '../components/Game'

export interface IGame {
  id: string;
  name: string;
  userId: string;
  username: string;
}

export const GamesList = () => {
  const [gamesList, setGamesList] = useState<IGame[] | null>(null);
  const gamesFbRef = collection(db, 'games')

  const getGames = async () => {
    const data = await getDocs(gamesFbRef);
    console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    setGamesList(
      data.docs.map(doc => ({ ...doc.data(), id: doc.id })) as IGame[]
      )
  }

  useEffect(() => {
    getGames()
  }, [])

  return (
    <div>
      <h3>Games List</h3>
      <ul>
        {gamesList?.map(game => (
          <Game game={game} />
        ))}
      </ul>
    </div>
  )
}
