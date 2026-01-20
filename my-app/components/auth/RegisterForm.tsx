'use client';

import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import SocialAuth from './SocialAuth';
import { signUp } from '@/actions/auth/register';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });
  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    signUp(data).then((res) => {
      console.log('Response:', res);
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
      />
      <FormField
        id='email'
        register={register}
        errors={errors}
        placeholder='email'
      />
      <FormField
        id='password'
        register={register}
        errors={errors}
        placeholder='password'
        type='password'
      />
      <FormField
        id='confirmPassword'
        register={register}
        errors={errors}
        placeholder='confirmPassword'
        type='password'
      />
      <Button type='submit' label='Registar' />
      <div className='flex justify-center my-2'>Ou</div>
      <SocialAuth />
    </form>
  );
};

export default RegisterForm;
