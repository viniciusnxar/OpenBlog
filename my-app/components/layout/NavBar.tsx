'use client';
import Container from './Container';
import ThemeToggle from './ThemeToggle';
import { MdNoteAlt } from 'react-icons/md';
import SearchInput from './SearchInput';
import Notifications from './Notifications';
import UserButton from './UserButton';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Tags from './Tags';

const NavBar = () => {
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';
  const path = usePathname();
  const router = useRouter();
  const isFeedsPage = path.includes('/blog/feed');

  console.log('Session', session);

  useEffect(() => {
    if (!isLoggedIn && path) {
      const updateSession = async () => {
        await session.update();
      };
      updateSession();
    }
  }, [path, isLoggedIn]);
  return (
    <nav className='sticky top-0 border-b z-50 bg-cyan'>
      <Container>
        <div className='flex justify-between items-center gap-8'>
          <div className='flex items-center gap-1 cursor-pointer'>
            <MdNoteAlt />
            <div onClick={() => router.push('/')} className='font-bold text-x1'>
              Openblog
            </div>
          </div>
          {isFeedsPage && <SearchInput />}
          <div className='flex gap-5 sn:gap-8 items-center'>
            <ThemeToggle />
            {isLoggedIn && <Notifications />}
            {isLoggedIn && <UserButton />}
            {!isLoggedIn && (
              <>
                <Link href='/login'>Login</Link>
                <Link href='/register'>Register</Link>
              </>
            )}
          </div>
        </div>
      </Container>
      <Tags />
    </nav>
  );
};

export default NavBar;
