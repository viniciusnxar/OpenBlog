import Container from './container';
import ThemeToggle from './themetoggle';
import { MdNoteAlt } from 'react-icons/md';
import SearchInput from './searchinput';
import Notifications from './notifications';
import UserButton from './userbutton';

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
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
