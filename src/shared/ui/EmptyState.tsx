interface EmptyStateProps {
  message?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  message,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const displayTitle = title || message;

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="text-gray-400">
        <svg
          className="h-16 w-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <div>
        <p className="text-base font-medium text-gray-900">{displayTitle}</p>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>
      {actionLabel && actionHref && (
        <a
          href={actionHref}
          className="mt-2 inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}
