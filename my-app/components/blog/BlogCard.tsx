import { auth } from '@/auth';
import { BlogWithUser } from '@/components/blog/ListBlogs';
import Reactions from '@/components/blog/Reactions';
import UserSummary from '@/components/blog/UserSummary';
import Tag from '@/components/common/Tag';
import Image from 'next/image';
import Link from 'next/link';

const BlogCard = async ({
  blog,
  isUserProfile,
}: {
  blog: BlogWithUser;
  isUserProfile?: boolean;
}) => {
  const session = await auth();
  const userId = session?.user.userId;
  const isOwner = userId === blog.userId;
  const isAdmin = session?.user.role === 'ADMIN';
  return (
    <div className='border-b border-slate-300 dark:border-slate-700 py-6 cursor-pointer'>
      <div className='flex items-center justify-between'>
        {blog.user && (
          <UserSummary user={blog.user} createdDate={blog.createdAt} />
        )}
        {isOwner && isUserProfile && !blog.isPublished && (
          <p className='text-rose-500'>Rascunho</p>
        )}
        {(isOwner || isAdmin) && isUserProfile && (
          <Link className='text-orange-400' href={`/blog/edit/${blog.id}`}>
            Edit
          </Link>
        )}
      </div>
      <div className='my-2 flex justify-between gap-6'>
        <div className='flex flex-col justify-between w-full'>
          <Link
            href={`/blog/details/${blog.id}`}
            className='text-xl sm:text-2xl font-bold'
          >
            {blog.title}
          </Link>
          {!!blog.tags.length && (
            <div className='flex items-center gap-4 flex-wrap my-2'>
              {blog.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          <Reactions blog={blog} />
        </div>

        {blog.coverImage && (
          <Link
            href={`/blog/details/${blog.id}`}
            className='w-full max-w-40 h-25 relative overflow-hidden'
          >
            <Image
              src={blog.coverImage}
              fill
              alt={blog.title}
              className='object-cover rounded-md'
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
