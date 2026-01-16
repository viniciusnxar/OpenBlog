'use client';

import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({
  label,
  disabled,
  outlined,
  small,
  icon: Icon,
  className,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'disabled:opacity-70 disabled:cursor-not-allowed rounded-md hoover:opacity-80 transitions w-auto border-slate-300 flex items-center justify-center gap-2 py-3 px-5 my-2 bg-button-primary text-button-primary-text dark:border-red-700',
        outlined &&
          'bg-button-primary text-button-primary-text dark:text-button-primary-text dark:-button-primary',
        small && 'text-sm py-1 px-2 border',
        className && className
      )}
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default Button;
