import Container from './Container';
import ThemeToggle from './ThemeToggle';
import { MdNoteAlt } from 'react-icons/md';
import SearchInput from './SearchInput';
import Notifications from './Notifications';
import UserButton from './UserButton';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className='sticky top-0 border-b z-50 bg-cyan'>
      <Container>
        <div className='flex justify-between items-center gap-8'>
          <div className='flex items-center gap-1 cursor-pointer'>
            <MdNoteAlt />
            <div className='font-bold text-x1'>Openblog</div>
          </div>
          <SearchInput />
          <div className='flex gap-5 sn:gap-8 items-center'>
            <ThemeToggle />
            <Notifications />
            <UserButton />
            <>
              <Link href='/login'>Login</Link>
              <Link href='/register'>Register</Link>
            </>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
