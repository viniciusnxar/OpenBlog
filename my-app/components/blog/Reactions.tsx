'use client';
import { PiHandsClapping } from 'react-icons/pi';
import { FaBookmark, FaRegBookmark, FaRegComment } from 'react-icons/fa';
import { useState } from 'react';
import { BlogwithUser } from './ListBlogs';
import { FaHandsClapping } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { clapBlog } from '@/actions/blogs/clap-blog';
import { useRouter } from 'next/navigation';
import { bookmarkBlog } from '@/actions/blogs/bookmark-blog';

const Reactions = ({ blog }: { blog: BlogwithUser }) => {
  const session = useSession();
  const userId = session.data?.user.userId;
  const [clapCount, setClapCount] = useState(blog._count.claps);
  const [userClapped, setUserClapped] = useState(!!blog.claps.length);
  const [userBookmarked, setUserBookmarked] = useState(!!blog.bookmark.length);

  const router = useRouter();

  const handleClap = async () => {
    if (!userId) return;
    setClapCount((prevCount) => (userClapped ? prevCount - 1 : prevCount + 1));
    setUserClapped((prevState) => !prevState);

    await clapBlog(blog.id, userId);
    router.refresh();
  };

  const handleBookmark = async () => {
    if (!userId) return;
    setUserBookmarked((prevState) => !prevState);

    await bookmarkBlog(blog.id, userId);
    router.refresh();
  };
  return (
    <div className='flex justify-between items-center w-full text-sm'>
      <div className='flex items-center gap-4'>
        <span
          onClick={handleClap}
          className='mr-4 flex items-center gap-1 cursor-pointer'
        >
          {userClapped ? (
            <FaHandsClapping size={20} />
          ) : (
            <PiHandsClapping size={20} />
          )}
          {clapCount}
        </span>
        <span className='flex items-center gap-1 cursor-pointer'>
          <FaRegComment size={18} />
          {3}
        </span>
      </div>
      <div>
        <span onClick={handleBookmark}>
          {userBookmarked ? (
            <FaBookmark size={18} />
          ) : (
            <FaRegBookmark size={18} />
          )}
        </span>
      </div>
    </div>
  );
};

export default Reactions;
