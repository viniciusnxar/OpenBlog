'use client';

import { useRouter } from 'next/navigation';

const RegisterButton = () => {
  const router = useRouter();
  return <button onClick={() => router.push('/register')}>Register</button>;
};

export default RegisterButton;
