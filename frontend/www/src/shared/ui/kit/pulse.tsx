import { cn } from "~/shared/lib/utils/cn";

export const Pulse = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative inline-flex size-2", className)}>
      <div className={"rounded-full bg-link size-full inline-block"}></div>
      <div className="absolute animate-ping rounded-full bg-link size-full"></div>
    </div>
  );
};
