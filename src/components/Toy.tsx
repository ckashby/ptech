import { ToyInterface } from "../pages/ToysList"

interface Props {
  toy: ToyInterface;
}

export const Toy = (props: Props) => {
  const { toy } = props;

  return (
    <li>Toy</li>
  )
}
