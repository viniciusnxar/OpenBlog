'use client';

import { useRouter } from 'next/navigation';
import Button from '../common/Button';
import { User } from '@/prisma/generated/prisma';

const EditProfileButton = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <Button
      className='cursor-pointer'
      label='Edit'
      onClick={() => router.push(`/user/edit/${user.id}`)}
    />
  );
};

export default EditProfileButton;
