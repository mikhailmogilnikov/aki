import { useMediaQuery } from "usehooks-ts";

const BREAKPOINT_MOBILE = CONFIG.BREAKPOINT_MOBILE;

import {
  Drawer,
  DrawerContent,
  type DrawerContentProps,
  DrawerFooter,
  type DrawerFooterProps,
  DrawerHeader,
  type DrawerHeaderProps,
  type DrawerProps,
} from "./drawer";
import {
  Modal,
  ModalContent,
  type ModalContentProps,
  ModalFooter,
  type ModalFooterProps,
  ModalHeader,
  type ModalHeaderProps,
  type ModalProps,
} from "./modal";
import { CONFIG } from "~/shared/model/config";

export interface AdaptiveModalProps {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: () => void;
  modalProps?: ModalProps;
  drawerProps?: DrawerProps;
}

export const AdaptiveModal = ({
  children,
  open,
  onOpenChange,
  modalProps,
  drawerProps,
}: AdaptiveModalProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE.toString());

  return isMobile ? (
    <Drawer open={open} onOpenChange={onOpenChange} {...drawerProps}>
      {children}
    </Drawer>
  ) : (
    <Modal open={open} onOpenChange={onOpenChange} {...modalProps}>
      {children}
    </Modal>
  );
};

interface AdaptiveModalHeaderProps {
  children?: React.ReactNode;
  drawerProps?: DrawerHeaderProps;
  modalProps?: ModalHeaderProps;
}

export const AdaptiveModalHeader = ({
  children,
  drawerProps,
  modalProps,
  ...props
}: AdaptiveModalHeaderProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE.toString());

  return isMobile ? (
    <DrawerHeader {...drawerProps} {...props}>
      {children}
    </DrawerHeader>
  ) : (
    <ModalHeader {...modalProps} {...props}>
      {children}
    </ModalHeader>
  );
};

interface AdaptiveModalContentProps {
  children?: React.ReactNode;
  drawerProps?: DrawerContentProps;
  modalProps?: ModalContentProps;
}

export const AdaptiveModalContent = ({
  children,
  ...props
}: AdaptiveModalContentProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE.toString());

  const { drawerProps, modalProps } = props;

  return isMobile ? (
    <DrawerContent {...drawerProps}>{children}</DrawerContent>
  ) : (
    <ModalContent {...modalProps}>{children}</ModalContent>
  );
};

interface AdaptiveModalFooterProps {
  children?: React.ReactNode;
  drawerProps?: DrawerFooterProps;
  modalProps?: ModalFooterProps;
}

export const AdaptiveModalFooter = ({
  children,
  ...props
}: AdaptiveModalFooterProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE.toString());

  const { drawerProps, modalProps } = props;

  return isMobile ? (
    <DrawerFooter {...drawerProps}>{children}</DrawerFooter>
  ) : (
    <ModalFooter {...modalProps}>{children}</ModalFooter>
  );
};
