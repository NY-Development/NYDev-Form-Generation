import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  text?: string;
  fullPage?: boolean;
}

export const LoadingSpinner = ({ size = 24, className = '', text, fullPage = false }: LoadingSpinnerProps) => {
  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 size={size} className="animate-spin text-primary" />
      {text && <p className="text-sm text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        {spinner}
      </div>
    );
  }

  return spinner;
};
