import { cn } from '@/lib/utils';
import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

interface LoginValues {
  email: string;
  password: string;
}

interface FormFieldProps {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  label?: string;
  inputClassNames?: string;
  register: UseFormRegister<LoginValues>;
  errors: FieldErrors;
}

const FormField = ({
  id,
  type,
  disabled,
  placeholder,
  label,
  inputClassNames,
  register,
  errors,
}: FormFieldProps) => {
  const message = errors[id] && (errors[id]?.message as string);
  return (
    <div>
      {label && <span className='block text-sm'>{label}</span>}
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id as Path<LoginValues>)}
        className={cn(
          'w-full px-4 py-3 my-1 outline-none rounded-md border transition-colors',
          'disabled:opacity-70 disabled:cursor-not-allowed',
          'border-slate-300 dark:border-slate-700',
          'bg-white dark:bg-slate-900',
          'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'dark:focus:ring-blue-600 dark:focus:border-blue-600',
          errors &&
            'border-slate-400 focus:ring-rose-300 dark:focus:ring-rose-700',
          inputClassNames
        )}
      />
      {message && <span className='text-sm text-rose-400'>{message}</span>}
    </div>
  );
};

export default FormField;
