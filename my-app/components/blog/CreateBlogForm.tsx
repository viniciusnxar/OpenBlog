'use client';

import { BlogSchema, BlogSchemaType } from '@/schemas/BlogSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import FormField from '../common/FormField';
import AddCover from './AddCover';
import { useState } from 'react';

//userID pode ter problemas, colocar userId se tiver
const CreateBlogForm = () => {
  const session = useSession();
  const userID = session.data?.user.userId;
  const [uploadedCover, setUploadedCover] = useState<string>();
  console.log(uploadedCover);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      userID,
      isPublished: false,
    },
  });
  return (
    <form className='flex felx-col justify-between max-w-300 m-auto min-h-[85vh]'>
      <AddCover setUploadedCover={setUploadedCover} />
      <FormField
        id='tittle'
        register={register}
        errors={errors}
        placeholder='Titulo Blog'
        disabled={false}
        inputClassNames='border-none text-5xl font-bold bg-transparent dark:bg-primary px-0'
      ></FormField>
    </form>
  );
};

export default CreateBlogForm;
