'use client';

import { BlogSchema, BlogSchemaType } from '@/schemas/BlogSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import FormField from '../common/FormField';
import AddCover from './AddCover';
import { useState } from 'react';
import CoverImage from './CoverImage';
import { tags } from '@/lib/tags';

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
    <form className='flex flex-col justify-between max-w-300 m-auto min-h-[85vh] '>
      <div>
        {!!uploadedCover && (
          <CoverImage
            url={uploadedCover}
            isEditor={true}
            setUploadedCover={setUploadedCover}
          />
        )}
        {!uploadedCover && <AddCover setUploadedCover={setUploadedCover} />}
        <FormField
          id='tittle'
          register={register}
          errors={errors}
          placeholder='Titulo Blog'
          disabled={false}
          inputClassNames='border-none text-5xl font-bold bg-transparent dark:bg-primary px-0'
        />

        <fieldset className='flex flex-col border-y mb-4 py-2'>
          <legend className='mb-2 pr-2'>Selecione 4 categorias</legend>
          <div className='flex gap-4 flex-wrap w-full'>
            {tags.map((tag) => {
              if (tag === 'All') return null;

              return (
                <label key={tag} className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    value={tag}
                    {...register('tags')}
                    disabled={false}
                  />
                  <span>{tag}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export default CreateBlogForm;
