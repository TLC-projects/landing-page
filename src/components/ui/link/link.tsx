import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button/button';
import type { VariantProps } from 'class-variance-authority';

interface Props extends React.ComponentProps<'a'>, VariantProps<typeof buttonVariants> {
  href: string;
}

export const Link: React.FC<Props> = ({
  href,
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}) => {
  return (
    <a href={href} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </a>
  );
};
