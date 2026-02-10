import BlogCard from '@/app/blog/BlogCard';
import { Blog, User } from '@/prisma/generated/prisma';
import Link from 'next/link';
import Pagination from './Pagination';

export type BlogwithUser = Blog & {
  user: Pick<User, 'id' | 'name' | 'image'>;
};
interface ListBlogsProps {
  blogs: BlogwithUser[];
  hasMore: boolean;
  currentPage: number;
  isUserProfile?: boolean;
}

const ListBlogs = ({
  blogs,
  hasMore,
  currentPage,
  isUserProfile,
}: ListBlogsProps) => {
  return (
    <div className='flex flex-col max-w-200 m-auto justify-between min-h-[85vh] px-4 pt-2'>
      <section>
        {blogs.map((blog) => (
          <BlogCard blog={blog} isUserProfile={isUserProfile} key={blog.id} />
        ))}
      </section>
      <Pagination currentPage={currentPage} hasMore={hasMore} />
    </div>
  );
};

export default ListBlogs;
