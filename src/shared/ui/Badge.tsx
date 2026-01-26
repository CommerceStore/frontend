import type { ReactNode } from 'react';

type BadgeVariant = 'sale' | 'new' | 'soldout' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  sale: 'bg-red-600 text-white',
  new: 'bg-primary-600 text-white',
  soldout: 'bg-zinc-600 text-white',
  default: 'bg-zinc-100 text-zinc-900',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-1 text-xs font-bold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
