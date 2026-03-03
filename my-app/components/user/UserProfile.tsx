import { User } from '@/prisma/generated/prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Calendar, UserRound } from 'lucide-react';
import moment from 'moment';
import { getBlogsByUserId } from '@/actions/blogs/get-blogs-by-userid';
import Alert from '../common/Alert';
import ListBlogs from '../blog/ListBlogs';
import EditProfileButton from './EditProfileButton';

const UserProfile = async ({ user, page }: { user: User; page: string }) => {
  const currentPage = parseInt(page, 10) || 1;

  const { success, error } = await getBlogsByUserId({
    page: currentPage,
    limit: 5,
    userId: user.id,
  });
  return (
    <div className='max-w-300 m-auto p-4'>
      <div className='flex gap-6 justify-between'>
        <div className='flex items-start sm:items-center gap-6 flex-col sm:flex-row'>
          <Avatar className='w-20 h-20'>
            <AvatarImage src={user?.image ? user?.image : ''} />
            <AvatarFallback className='border-2 border-slate-500 dark:border-slate-50'>
              <UserRound />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl sm:text-3xl font-bold'>{user.name}</h1>
            {user.bio && <p>{user.bio}</p>}
            <div className='flex items-center gap-4'>
              <span>Followers</span>
              <span>Following</span>
            </div>
            <div className='flex gap-2 items-center'>
              <Calendar size={18} /> Membro Desde:{' '}
              {moment(user.createdAt).format('Do MMMM YYYY')}
            </div>
          </div>
        </div>
        <div>
          <EditProfileButton user={user} />
        </div>
      </div>

      <div className='flex flex-col gap-4 p-6 mt-6 border-y flex-wrap'>
        <div>
          <span>
            ID:{' '}
            <span className='bg-secondary py-1 px-1 rounded'>{user.id}</span>
          </span>
        </div>
        <div>
          <span>
            Email:{' '}
            <span className='bg-secondary py-1 px-1 rounded'>{user.email}</span>
          </span>
        </div>
      </div>
      {/* <div>Tags</div> */}
      <div>
        {error && <Alert error message='Error fetching user blogs' />}
        {success && (
          <ListBlogs
            blogs={success.blogs}
            hasMore={success.hasMore}
            currentPage={currentPage}
            isUserProfile={true}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
