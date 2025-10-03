import { cn } from "~/shared/lib/utils/cn";

export function SectionTitle({
  title,
  children,
  className,
  titleClassName,
  contentClassName,
  sideContent,
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  sideContent?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <p className={cn("text-base opacity-50", titleClassName)}>{title}</p>
        {sideContent}
      </div>

      <div className={cn("flex flex-col gap-4", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
