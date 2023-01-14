import { IPet } from '../pages/PetsList';

interface Props {
  pet: IPet;
}

export const Pet = (props: Props) => {
  const { pet } = props;

  return (
    <li>{pet.name} - {pet.species} : {pet.breed} - {pet.username}</li>
  );
};
