'use client';


import { FaBookmark, FaRegBookmark, FaRegComment } from 'react-icons/fa';
import { useState } from 'react';
import { BlogWithUser } from './ListBlogs';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { likeBlog } from '@/actions/blogs/like-blog';
import { useRouter } from 'next/navigation';
import { bookmarkBlog } from '@/actions/blogs/bookmark-blog';

const Reactions = ({ blog }: { blog: BlogWithUser }) => {
  const session = useSession();
  const userId = session.data?.user.userId;
  const [likeCount, setLikeCount] = useState(blog._count.likes);
  const [userLiked, setUserliked] = useState(!!blog.likes.length);
  const [userBookmarked, setUserBookmarked] = useState(!!blog.bookmark.length);

  const router = useRouter();

  const handleLike = async () => {
    if (!userId) return;
    setLikeCount((prevCount) => (userLiked ? prevCount - 1 : prevCount + 1));
    setUserliked((prevState) => !prevState);

    await likeBlog(blog.id, userId);
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
          onClick={handleLike}
          className='mr-4 flex items-center gap-1 cursor-pointer'
        >
          {userLiked ? (
            <FaRegThumbsUp size={20} />
          ) : (
            <FaRegThumbsUp size={20} />
          )}
          {likeCount}
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
