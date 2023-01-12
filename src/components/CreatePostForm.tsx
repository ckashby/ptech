import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface CreateFormData {
  title: string;
  body: string;
}

export default function CreatePostForm() {
  const schema = yup.object().shape({
    title: yup.string().required('Title for post is required.').min(3).max(5),
    body: yup.string().required('Min of 5 characters...').min(3).max(5),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const onCreatePost = (data: CreateFormData) => {
    console.log(data);
  };

  return (
    <div>
      <h3>Create Post</h3>
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input type="text" {...register('title')} style={{ width: '170px' }} />
        <br />
        <p style={{color: 'red'}}>{errors.title?.message}</p>
        <textarea rows={5} {...register('body')} />
        <br />
        <p style={{color: 'red'}}>{errors.body?.message}</p>
        {/* <input type='text' placeholder='Enter username...' /><br />
        <input type='text' placeholder='Enter id??...' /><br /> */}
        <input type="submit" />
      </form>
    </div>
  );
}
