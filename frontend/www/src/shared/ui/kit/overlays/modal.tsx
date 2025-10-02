import * as Dialog from "@radix-ui/react-dialog";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { ScrollArea, type ScrollAreaProps } from "../scroll-area";

import { X } from "lucide-react";

import { type VariantProps, tv } from "tailwind-variants";

const modalTV = tv({
  slots: {
    overlay:
      "data-[state=closed]:motion-opacity-out data-[state=open]:motion-opacity-in fixed inset-0 z-50 bg-black/50",
    content:
      "bg-background border-outline border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full rounded z-50 data-[state=closed]:motion-scale-out-98 data-[state=closed]:motion-opacity-out data-[state=open]:motion-scale-in-98 motion-duration-200 flex flex-col data-[state=open]:motion-opacity-in min-h-16 h-auto",
    close:
      "bg-default absolute right-4 top-4 z-30 flex size-8 items-center justify-center rounded-full shadow cursor-pointer",
    closeIcon: "size-5 opacity-60",
  },
  variants: {
    width: {
      md: { content: "max-w-md" },
      lg: { content: "max-w-lg" },
      xl: { content: "max-w-xl" },
      "2xl": { content: "max-w-2xl" },
      "3xl": { content: "max-w-3xl" },
      "4xl": { content: "max-w-4xl" },
      "5xl": { content: "max-w-5xl" },
      full: { content: "w-[calc(100vw-2rem)]" },
    },
    height: {
      xs: { content: "max-h-[60%]" },
      sm: { content: "max-h-[70%]" },
      md: { content: "max-h-[80%]" },
      lg: { content: "max-h-[90%]" },
      full: { content: "max-h-[calc(100vh-2rem)]" },
    },
  },
  defaultVariants: {
    width: "md",
    height: "md",
  },
});

export type ModalVariants = VariantProps<typeof modalTV>;

export interface ModalProps extends Dialog.DialogProps, ModalVariants {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * ClassNames for modal
   */
  classNames?: {
    overlay?: string;
    content?: string;
    close?: string;
    closeIcon?: string;
  };
  /**
   * Hide close button
   */
  hideClose?: boolean;
  /**
   * Modal width
   */
  width?: ModalVariants["width"];
  /**
   * Modal height
   */
  height?: ModalVariants["height"];
}

export function Modal(props: ModalProps) {
  const { children, hideClose, classNames, width, height, ...rest } = props;

  const { content, overlay, close, closeIcon } = modalTV({ width, height });

  return (
    <Dialog.Root {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={overlay({ className: classNames?.overlay })}
        />
        <Dialog.Content
          onPointerDownOutside={(e) => {
            if (
              e.target instanceof Element &&
              e.target.closest("[data-sonner-toast]")
            ) {
              e.preventDefault();
            }
          }}
          className={content({ className: classNames?.content })}
        >
          {!hideClose && (
            <Dialog.Close className={close({ className: classNames?.close })}>
              <X className={closeIcon({ className: classNames?.closeIcon })} />
            </Dialog.Close>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export interface ModalHeaderProps extends Dialog.DialogTitleProps {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  restContent?: React.ReactNode;
}

export function ModalHeader(props: ModalHeaderProps) {
  const { wrapperProps, restContent, ...rest } = props;

  return (
    <div className="pr-13 flex shrink-0 flex-col gap-6 p-6" {...wrapperProps}>
      <Dialog.Title {...rest} className="shrink-0 text-2xl font-semibold" />
      <VisuallyHidden asChild>
        <Dialog.Description />
      </VisuallyHidden>
      {restContent}
    </div>
  );
}

export type ModalContentProps = ScrollAreaProps;

export function ModalContent(props: ModalContentProps) {
  const { children, ...rest } = props;

  return (
    <ScrollArea
      className="shrink-1 mb-4 flex h-full flex-col gap-6 overflow-y-auto px-6"
      classNames={{
        scrollbar: "px-1",
        verticalScrollbar: "w-3.5",
        horizontalScrollbar: "h-3.5",
      }}
      {...rest}
    >
      <div className="flex flex-col gap-4 px-1">{children}</div>
    </ScrollArea>
  );
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  cancelButton?: boolean;
}

export function ModalFooter(props: ModalFooterProps) {
  const { cancelButton = false, children, ...rest } = props;

  return (
    <div className="flex shrink-0 items-center gap-6 px-6 pb-6" {...rest}>
      {cancelButton && (
        <Dialog.Close asChild>
          <button className="bg-default w-full cursor-pointer rounded px-4 py-2 font-medium shadow">
            Cancel
          </button>
        </Dialog.Close>
      )}
      {children}
    </div>
  );
}
