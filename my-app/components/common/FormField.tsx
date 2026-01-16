import { cn } from '@/lib/utils';
import {
  FieldErrors,
  Path,
  UseFormRegister,
  FieldValues,
} from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  label?: string;
  inputClassNames?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  placeholder,
  label,
  inputClassNames,
  register,
  errors,
}: FormFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);
  return (
    <div>
      {label && <span className='block text-sm'>{label}</span>}
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id as Path<T>)}
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
