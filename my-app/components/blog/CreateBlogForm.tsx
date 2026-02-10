'use client';

import { BlogSchema, BlogSchemaType } from '@/schemas/BlogSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import FormField from '../common/FormField';
import AddCover from './AddCover';
import { useEffect, useState, useTransition } from 'react';
import CoverImage from './CoverImage';
import { tags } from '@/lib/tags';
import BlockNoteEditor from './editor/BlockNoteEditor';
import Button from '../common/Button';
import Alert from '../common/Alert';
import { CreateBlog } from '@/actions/blogs/create-blog';
import { Blog } from '@/prisma/generated/prisma';
import { editBlog } from '@/actions/blogs/edit-blog';

//userId pode ter problemas, colocar userId se tiver
const CreateBlogForm = ({ blog }: { blog?: Blog }) => {
  const session = useSession();
  const userId = session.data?.user.userId;
  const [uploadedCover, setUploadedCover] = useState<string>();
  const [content, setContent] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [isPublishing, startPublishing] = useTransition();
  const [isSavingDraft, startSavingDraft] = useTransition();

  console.log(uploadedCover);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: blog
      ? {
          userId: blog.userId,
          isPublished: blog.isPublished,
          title: blog.title,
          content: blog.content,
          coverImage: blog.coverImage || undefined,
          tags: blog.tags,
        }
      : {
          userId,
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

  useEffect(() => {
    if (blog?.coverImage) {
      setUploadedCover(blog.coverImage);
    }
  }, [blog?.coverImage]);

  const onChange = (content: string) => {
    setContent(content);
  };

  const onPublish: SubmitHandler<BlogSchemaType> = (data) => {
    console.log('Data:', data);
    setSuccess('');
    setError('');
    if (data.tags.length > 4) {
      return setError('Selecione apenas 4 categorias');
    }
    startPublishing(() => {
      if (blog) {
        editBlog({ ...data, isPublished: true }, blog.id).then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            setSuccess(data.success);
          }
        });
      } else {
        CreateBlog({ ...data, isPublished: true }).then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        });
      }
    });
  };

  const onSaveDraft: SubmitHandler<BlogSchemaType> = (data) => {
    console.log('Data:', data);
    setSuccess('');
    setError('');

    startSavingDraft(() => {
      if (blog) {
        editBlog({ ...data, isPublished: false }, blog.id).then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            setSuccess(data.success);
          }
        });
      } else {
        CreateBlog({ ...data, isPublished: false }).then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        });
      }
    });
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
          id='title'
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
        <BlockNoteEditor
          onChange={onChange}
          initialContent={blog?.content ? blog.content : ''}
        />
        {errors.content && errors.content.message && (
          <span className='text-sm text-rose-400'>
            {errors.content.message}
          </span>
        )}
      </div>
      <div className='border-t pt-2'>
        {errors.userId && errors.userId.message && (
          <span className='text-sm text-rose-400'>Está faltando o userId</span>
        )}
        {success && <Alert message={success} success />}
        {error && <Alert message={error} error />}
        <div className='flex items-center justify-between gap-6'>
          <div>
            <Button type='button' label='Deletar' />
          </div>
          <div className='flex gap-4'>
            <Button
              type='submit'
              label={isPublishing ? 'Publicando...' : 'Publicar'}
              className='bg-blue-700'
            />
            <Button
              type='button'
              label={isSavingDraft ? 'Salvando...' : 'Salvar Rascunho'}
              onClick={handleSubmit(onSaveDraft)}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateBlogForm;
