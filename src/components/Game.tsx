import { IGame } from '../pages/GamesList'

interface Props {
  game: IGame;
}

export const Game = (props: Props) => {
  const { game } = props;

  return (
    <li>
      {game.name} - {game.username}
    </li>
  )
}
