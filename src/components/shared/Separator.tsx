import { cn } from '../../utility/cn';

export default function Separator({ className }: { className?: string }) {
  return <span className={cn('w-full h-[1px] bg-platinumDark block my-4', className)} />;
}
