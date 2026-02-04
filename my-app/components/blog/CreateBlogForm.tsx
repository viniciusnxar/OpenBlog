'use client';

import { BlogSchema, BlogSchemaType } from '@/schemas/BlogSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import FormField from '../common/FormField';
import AddCover from './AddCover';
import { useEffect, useState } from 'react';
import CoverImage from './CoverImage';
import { tags } from '@/lib/tags';
import BlockNoteEditor from './editor/BlockNoteEditor';
import Button from '../common/Button';
import Alert from '../common/Alert';

//userID pode ter problemas, colocar userId se tiver
const CreateBlogForm = () => {
  const session = useSession();
  const userID = session.data?.user.userId;
  const [uploadedCover, setUploadedCover] = useState<string>();
  const [content, setContent] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');

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

  useEffect(() => {
    if (uploadedCover) {
      setValue('coverImage', uploadedCover, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [uploadedCover]);

  useEffect(() => {
    if (typeof content === 'string') {
      setValue('content', content, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [content]);

  const onChange = (content: string) => {
    setContent(content);
  };

  const onPublish: SubmitHandler<BlogSchemaType> = (data) => {
    console.log('Data:', data);
  };

  console.log('errooooo:', errors);

  return (
    <form
      onSubmit={handleSubmit(onPublish)}
      className='flex flex-col justify-between max-w-300 m-auto min-h-[85vh] '
    >
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
          {errors.tags && errors.tags.message && (
            <span className='text-sm text-rose-400'>
              Selecione pelo menos 4 categorias
            </span>
          )}
        </fieldset>
        <BlockNoteEditor onChange={onChange} />
        {errors.content && errors.content.message && (
          <span className='text-sm text-rose-400'>
            {errors.content.message}
          </span>
        )}
      </div>
      <div className='border-t pt-2'>
        {errors.userID && errors.userID.message && (
          <span className='text-sm text-rose-400'>Está faltando o UserID</span>
        )}
        {success && <Alert message={success} success />}
        {error && <Alert message={error} error />}
        <div className='flex items-center justify-between gap-6'>
          <div>
            <Button type='button' label='Deletar' />
          </div>
          <div className='flex gap-4'>
            <Button type='submit' label='Publicar' className='bg-blue-700' />
            <Button type='button' label='Salvar rascunho' />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateBlogForm;
