'use client';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useDebounceValue } from '@/hooks/useeDebounceValues';

const SearchInput = () => {
  const params = useSearchParams();
  const title = params.get('title');
  const router = useRouter();
  const [value, setValue] = useState(title || '');
  const pathName = usePathname();

  const debounceValue = useDebounceValue<string>(value);

  useEffect(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      title: debounceValue,
    };
    const url = queryString.stringifyUrl(
      {
        url: '/blog/feed/1',
        query: updatedQuery,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );
    router.push(url);
  }, [debounceValue]);
  const handlOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  const isFeedsPage = pathName.includes('/blog/feed');
  if (!isFeedsPage) return null;
  return (
    <div className='relative hidden sm:block'>
      <Search className='absolute top-3 left-4 h-4 w-4 text-muted-foreground' />
      <Input
        value={value}
        onChange={handlOnChange}
        placeholder='Search'
        className=' pl-10 bg-primary/10'
      />
    </div>
  );
};

export default SearchInput;
