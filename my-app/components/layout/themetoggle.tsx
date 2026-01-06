'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className='p-2 rounded-lg bg-gray-200 dark:bg-gray-800'>
        <div className='w-5 h-5' />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='p-2 rounded-lg bg-gray-200  hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors'
      aria-label='Alternar tema'
    >
      {theme === 'dark' ? (
        <Sun className='w-5 h-5 text-yellow-500' />
      ) : (
        <Moon className='w-5 h-5 text-gray-700 dark:text-gray-300' />
      )}
    </button>
  );
}

export default ThemeToggle