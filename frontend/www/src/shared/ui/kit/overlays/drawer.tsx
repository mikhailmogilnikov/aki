import { Drawer as VaulDrawer, type DialogProps } from "vaul";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type DialogTitleProps } from "@radix-ui/react-dialog";

import { ScrollArea } from "../scroll-area";
import { type ScrollAreaProps } from "../scroll-area";
import { cn } from "~/shared/lib/utils/cn";
import { X } from "lucide-react";

export type DrawerProps = DialogProps & {
  hideThumb?: boolean;
  hideClose?: boolean;
};

export const Drawer = (props: DrawerProps) => {
  const {
    hideThumb = false,
    hideClose = false,
    open,
    onOpenChange,
    children,
    ...rest
  } = props;

  // useUpdateThemeColor({ isOpen: open ?? false });

  return (
    // @ts-expect-error
    <VaulDrawer.Root
      open={open}
      repositionInputs={false}
      shouldScaleBackground={false}
      onOpenChange={onOpenChange}
      {...rest}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="z-20 fixed inset-0 bg-black/60" />

        <VaulDrawer.Content className="bg-background z-21 fixed bottom-0 left-0 right-0 h-fit max-h-[95svh] rounded-t outline-none focus:outline-none border-t border-outline">
          <div className="z-10 overflow-hidden">
            {!hideThumb && (
              <div
                className="fixed left-0 right-0 top-0 flex h-6 items-center justify-center"
                id="drawer-header"
              >
                <div
                  aria-hidden
                  className="bg-foreground/20 mx-auto mt-4 h-1.5 w-10 flex-shrink-0 rounded-full"
                  id="drawer-thumb"
                />
              </div>
            )}
            {!hideClose && (
              <VaulDrawer.Close className="bg-default absolute right-4 top-4 z-10 rounded-full p-1">
                <X className="size-5 opacity-30" />
              </VaulDrawer.Close>
            )}
            <div className="z-0 flex max-h-[95svh] flex-col gap-4 overflow-y-auto pb-6">
              {children}
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
};

export interface DrawerHeaderProps extends DialogTitleProps {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  restContent?: React.ReactNode;
}

export function DrawerHeader(props: DrawerHeaderProps) {
  const { wrapperProps, restContent, className, ...rest } = props;

  return (
    <div
      className={cn("flex shrink-0 flex-col gap-6 p-6 pb-0", className)}
      {...wrapperProps}
    >
      <VaulDrawer.Title
        {...rest}
        className="mt-6 shrink-0 text-2xl font-semibold"
      />
      <VisuallyHidden asChild>
        <VaulDrawer.Description />
      </VisuallyHidden>
      {restContent}
    </div>
  );
}

export type DrawerContentProps = ScrollAreaProps;

export function DrawerContent(props: DrawerContentProps) {
  const { children, ...rest } = props;

  return (
    <ScrollArea
      className="shrink-1 flex h-full flex-col gap-6 overflow-y-auto px-6"
      classNames={{
        scrollbar: "px-1",
        verticalScrollbar: "w-3.5",
        horizontalScrollbar: "h-3.5",
      }}
      {...rest}
    >
      <div className="py-2"></div>
      {children}
    </ScrollArea>
  );
}

export interface DrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cancelButton?: boolean;
}

export function DrawerFooter(props: DrawerFooterProps) {
  const { cancelButton = false, children, ...rest } = props;

  return (
    <div className="flex shrink-0 gap-4 px-4" {...rest}>
      {cancelButton && (
        <VaulDrawer.Close asChild>
          <button className="bg-default w-full cursor-pointer rounded px-6 py-3 font-medium shadow">
            Cancel
          </button>
        </VaulDrawer.Close>
      )}
      {children}
    </div>
  );
}
