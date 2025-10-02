import {
  type ScrollAreaClassNames,
  ScrollArea as ScrollAreaComponent,
  type ScrollAreaProps as ScrollAreaPropsComponent,
} from "@blur-ui/scroll-area";

export type ScrollAreaProps = ScrollAreaPropsComponent;

import { cn } from "~/shared/lib/utils/cn";

export function ScrollArea(props: ScrollAreaProps) {
  const { classNames, children, ...rest } = props;

  const componentClassNames: ScrollAreaClassNames = {
    root: cn(classNames?.root),
    scrollbar: cn(
      "p-[1px] data-[state=visible]:motion-opacity-in-0 data-[state=hidden]:motion-opacity-out-0 user-select-none pointer-events-auto",
      classNames?.scrollbar
    ),
    verticalScrollbar: cn("w-2", classNames?.verticalScrollbar),
    horizontalScrollbar: cn("h-2", classNames?.horizontalScrollbar),
    thumb: cn(
      "bg-foreground/20 hover:bg-foreground/40 transition-colors rounded-full",
      classNames?.thumb
    ),
  };

  return (
    <ScrollAreaComponent
      type="always"
      classNames={componentClassNames}
      {...rest}
    >
      {children}
    </ScrollAreaComponent>
  );
}

ScrollArea.displayName = "ScrollArea";
