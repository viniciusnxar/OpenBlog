'use client';

import {
  EditProfileSchemaType,
  EditProfileSchema,
} from '@/schemas/EditProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Heading from '../common/Heading';
import { User } from '@/prisma/generated/prisma';
import { editUser } from '@/actions/users/edit-user';
// import { tags } from '@/lib/tags';

const EditUserForm = ({
  user,
  isCredentials,
}: {
  user: User;
  isCredentials: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      bio: user.bio || undefined,
      tags: user.tags || undefined,
    },
  });
  const onSubmit: SubmitHandler<EditProfileSchemaType> = (data) => {
    setSuccess('');
    setError('');
    startTransition(() => {
      editUser(data, user.id).then((res) => {
        if (res?.error) {
          setError(res.error);
        }

        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col max-w-125 m-auto mt-8 gap-2'
      >
        <Heading title='Editar email' lg />
        <FormField
          id='name'
          register={register}
          errors={errors}
          placeholder='name'
          disabled={isPending}
          label='Name'
        />
        {isCredentials && (
          <FormField
            id='email'
            register={register}
            errors={errors}
            placeholder='email'
            disabled={isPending || !isCredentials}
            label='Email'
          />
        )}
        <FormField
          id='bio'
          register={register}
          errors={errors}
          placeholder='bio'
          disabled={isPending}
          label='Bio'
        />
        {/* <fieldset className='flex flex-col'>
          <legend className='mb-2 pr-2'>Selecione categorias</legend>
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
        </fieldset> */}
        {error && <Alert message={error} error />}
        {success && <Alert message={success} success />}
        <Button
          type='submit'
          label={isPending ? 'Enviado...' : 'Salvar'}
          disabled={isPending}
        />
      </form>
    </>
  );
};

export default EditUserForm;
