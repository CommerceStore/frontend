import type { ReactNode } from 'react';

interface NavbarProps {
  children: ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {children}
        </div>
      </div>
    </nav>
  );
}

export function NavbarBrand({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center">
      <a href="/" className="text-xl font-bold text-zinc-900 hover:text-primary-600 transition-colors">
        {children}
      </a>
    </div>
  );
}

export function NavbarActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-3">{children}</div>;
}

export function NavbarIconButton({
  icon,
  label,
  badge,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  badge?: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
      aria-label={label}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-600 px-1 text-xs font-bold text-white">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
}
