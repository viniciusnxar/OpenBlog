'use client';

import {
  PasswordResetSchemaType,
  PasswordResetSchema,
} from '@/schemas/PasswordResetSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Heading from '../common/Heading';
import { useSearchParams } from 'next/navigation';
import { passwordReset } from '@/actions/auth/password-reset';

const PasswordResetFormClient = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema),
  });
  const token = searchParams.get('token');
  const onSubmit: SubmitHandler<PasswordResetSchemaType> = (data) => {
    setError('');
    startTransition(() => {
      passwordReset(data, token).then((res) => {
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
        <Heading title='Informe sua nova senha' lg center />
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
          label={isPending ? 'Resetando...' : 'Resetar senha '}
          disabled={isPending}
        />
      </form>
    </>
  );
};

export default PasswordResetFormClient;
