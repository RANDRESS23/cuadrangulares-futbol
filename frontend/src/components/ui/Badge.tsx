import { cn } from '../../utils/helpers';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'info', className }: BadgeProps) {
  const variantClasses = {
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
  };

  return (
    <span className={cn('badge', variantClasses[variant], className)}>
      {children}
    </span>
  );
}
