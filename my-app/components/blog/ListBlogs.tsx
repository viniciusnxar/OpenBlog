import BlogCard from '@/components/blog/BlogCard';
import { Blog, User } from '@/prisma/generated/prisma';
import Pagination from './Pagination';

export type BlogWithUser = Blog & {
  user: Pick<User, 'id' | 'name' | 'image'>;
  _count: {
    likes: number;
    comments: number;
  };
  likes: {
    id: string;
  }[];
  bookmark: {
    id: string;
  }[];
};
interface ListBlogsProps {
  blogs: BlogWithUser[];
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
      <Pagination
        currentPage={currentPage}
        hasMore={hasMore}
        isUserProfile={isUserProfile}
      />
    </div>
  );
};

export default ListBlogs;
