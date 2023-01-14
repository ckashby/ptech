import { PostInterface } from '../pages/Main';

interface Props {
  post: PostInterface;
}

export default function Post(props: Props) {
  const { post } = props;

  return (
    <li>
      <h4>{post.title}</h4>
      <p>{post.body} - @{post.username}</p>
      <button>&#128077;</button> Like!
    </li>
  );
}
