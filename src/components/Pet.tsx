import { PetInterface } from '../pages/PetsList';

interface Props {
  pet: PetInterface;
}

export const Pet = (props: Props) => {
  const { pet } = props;

  return (
    <li>{pet.name} - {pet.species} : {pet.breed} - {pet.username}</li>
  );
};
