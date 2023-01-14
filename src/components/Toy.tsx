import { IToy } from '../pages/ToysList';

interface Props {
  toy: IToy;
}

export const Toy = (props: Props) => {
  const { toy } = props;

  return (
    <li>
      {toy.name} - {toy.color} @{toy.username}
    </li>
  );
};
