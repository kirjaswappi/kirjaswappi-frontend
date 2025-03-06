import { cn } from "../../utility/cn";

export default function Line({ className }: { className?: string }) {
  return <div className={cn("w-full h-[1px] bg-gray", className)}></div>;
}
