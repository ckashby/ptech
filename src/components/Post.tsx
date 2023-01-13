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
      <p>&#128077; &copy; &reg; &trade; &#64; &#10003; &#36; &yen; &euro; &#8451; &#8457; &#171; &#128077;</p>
    </li>
  );
}
