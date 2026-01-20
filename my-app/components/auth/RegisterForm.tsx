'use client';

import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import SocialAuth from './SocialAuth';
import { signUp } from '@/actions/auth/register';
import { useState, useTransition } from 'react';
import Alert from '../common/Alert';

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });
  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    setSuccess('');
    setError('');
    startTransition(() => {
      signUp(data).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col max-w-125 m-auto mt-8 gap-2'
    >
      <Heading title='Crie sua conta em OpenBlog' lg center />
      <FormField
        id='name'
        register={register}
        errors={errors}
        placeholder='name'
        disabled={isPending}
      />
      <FormField
        id='email'
        register={register}
        errors={errors}
        placeholder='email'
        disabled={isPending}
      />
      <FormField
        id='password'
        register={register}
        errors={errors}
        placeholder='password'
        type='password'
        disabled={isPending}
      />
      <FormField
        id='confirmPassword'
        register={register}
        errors={errors}
        placeholder='confirmPassword'
        type='password'
        disabled={isPending}
      />

      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}

      <Button
        type='submit'
        label={isPending ? 'Registrando...' : 'Registar'}
        disabled={isPending}
      />
      <div className='flex justify-center my-2'>Ou</div>
      <SocialAuth />
    </form>
  );
};

export default RegisterForm;
