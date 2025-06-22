import Draggabilly from "draggabilly";
import { useEffect, useRef } from "react";
import Packery, {
  type Packery as PackeryType,
  type PackeryOptions,
} from "packery";

export const useBento = () => {
  const packeryRef = useRef<PackeryType | null>(null);

  useEffect(() => {
    const elem = document.querySelector(".grid-root") as HTMLElement;
    if (!elem) return;

    const halfSizeElement = document.querySelector(
      ".grid-sizer-half"
    ) as HTMLElement;
    const fullSizeElement = document.querySelector(
      ".grid-sizer-full"
    ) as HTMLElement;

    const gridItems = document.querySelectorAll(".grid-item");

    const handleSetItemsSize = (halfSize?: number, fullSize?: number) => {
      const halfSizeW = halfSize || halfSizeElement.clientWidth;
      const fullSizeW = fullSize || fullSizeElement.clientWidth;

      gridItems.forEach((item) => {
        (item as HTMLElement).style.setProperty(
          "--half-size",
          `${halfSizeW}px`
        );
        (item as HTMLElement).style.setProperty(
          "--full-size",
          `${fullSizeW}px`
        );
      });
    };

    const fullWidthInit = elem.clientWidth;
    const halfWidthInit = fullWidthInit / 2 - 8;

    handleSetItemsSize(halfWidthInit, fullWidthInit);

    // @ts-ignore
    const pckry = new Packery(elem, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-sizer-half",
      rowHeight: ".grid-sizer-half",
      percentPosition: true,
      isResizeBound: true,
      isInitLayout: true,
      gutter: 16,
    } as PackeryOptions) as PackeryType;

    packeryRef.current = pckry;

    gridItems.forEach((item) => {
      var draggie = new Draggabilly(item, {
        handle: ".handle",
      });
      pckry.bindDraggabillyEvents(draggie);
    });

    const handleDragItemPositioned = (
      event: Event,
      draggedItem: HTMLElement
    ) => {
      const elements = pckry.getItemElements();
      console.log(elements);
    };

    const handleGridResize = () => {
      handleSetItemsSize();
      pckry.layout();
    };

    pckry.on("dragItemPositioned", handleDragItemPositioned);
    window.addEventListener("resize", handleGridResize);

    handleGridResize();

    return () => {
      pckry.destroy();
      pckry.off("dragItemPositioned", handleDragItemPositioned);
      window.removeEventListener("resize", handleGridResize);
      packeryRef.current = null;
    };
  }, []);

  const handleUpdateLayout = () => {
    setTimeout(() => {
      packeryRef.current?.layout();
    }, 50);
  };

  return {
    packeryRef,
    handleUpdateLayout,
  };
};
