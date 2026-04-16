interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  pending: {
    bg: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  approved: {
    bg: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  verified: {
    bg: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  rejected: {
    bg: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
  },
  draft: {
    bg: 'bg-muted border-border',
    text: 'text-muted-foreground',
    dot: 'bg-muted-foreground',
  },
  published: {
    bg: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  closed: {
    bg: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
  },
  active: {
    bg: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  inactive: {
    bg: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
  },
};

export const StatusBadge = ({ status, size = 'sm' }: StatusBadgeProps) => {
  const config = statusConfig[status.toLowerCase()] || statusConfig.draft;
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium capitalize ${config.bg} ${config.text} ${sizeClass}`}>
      <span className={`size-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};
