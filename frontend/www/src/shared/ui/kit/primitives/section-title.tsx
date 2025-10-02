import { cn } from "~/shared/lib/utils/cn";

export function SectionTitle({
  title,
  children,
  className,
  titleClassName,
  contentClassName,
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className={cn("text-base opacity-50", titleClassName)}>{title}</p>
      <div className={cn("flex flex-col gap-4", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
