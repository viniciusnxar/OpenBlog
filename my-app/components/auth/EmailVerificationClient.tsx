'use client';

import { verifyEmail } from '@/actions/auth/email-verification';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Heading from '../common/Heading';
import Alert from '../common/Alert';
import Button from '../common/Button';

const EmailVerificationClient = () => {
  const SearchParams = useSearchParams();
  const token = SearchParams.get('token');
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [pending, setPending] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setPending(true);
    if (!token) return setError('Token de verificaçao inexistente');
    verifyEmail(token).then((res) => {
      setSuccess(res.success);
      setError(res.error);
    });
    setPending(false);
  }, [token]);
  return (
    <div className='border-2 rounded-md p-2 flex flex-col gap-2 items-center my-8 max-w-100 mx-auto'>
      <Heading title='OpenBlog' center />
      {pending && <div>Verificando email</div>}
      {success && <Alert message={success} success />}
      {error && <Alert message={error} error />}
      {success && (
        <Button
          type='submit'
          label='Login'
          onClick={() => router.push('/login')}
          className='cursor-pointer'
        />
      )}
    </div>
  );
};

export default EmailVerificationClient;
