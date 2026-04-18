'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-400',
        variant === 'primary'
          ? 'bg-brand-500 text-white hover:bg-brand-600'
          : 'border border-slate-300 bg-white text-slate-700 hover:border-accent hover:text-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-accent dark:hover:text-accent',
        className
      )}
      {...props}
    />
  );
}
