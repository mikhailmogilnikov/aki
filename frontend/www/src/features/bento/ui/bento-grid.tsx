import { AutoScroller, MuuriComponent } from "muuri-react";
import { BentoItemComponent, type BentoItemProps } from "./bento-item/index";
import type { BentoSize } from "../model/bento.type";
import { useBentoSize } from "../model/useBentoSize";
import { sortBy } from "~/shared/lib/utils/sort-by";
import { useBlendy } from "~/shared/lib/hooks/useBlendy";
import { useProfile } from "~/services/edit-profile/model/profile-provider";
import { AddBentoItemButton } from "./add-item/add-item-button";
import type { RefObject } from "react";
import type { Blendy } from "blendy";

export const BentoGrid = () => {
  const { sizerRef, size } = useBentoSize();
  const { blendy } = useBlendy();

  return (
    <div className="relative w-full">
      <div
        ref={sizerRef}
        id="grid-sizer"
        className="w-full aspect-square absolute top-0 invisible m-2"
      ></div>
      {size && <BentoGridE size={size} blendy={blendy} />}
      <AddBentoItemButton onAdd={() => blendy.current?.update()} />
    </div>
  );
};

const BentoGridE = ({
  size,
  blendy,
}: {
  size: number;
  blendy: RefObject<Blendy | null>;
}) => {
  const { profile, updateProfile } = useProfile();

  const items = sortBy(profile.bento, "order");

  const handleSizeChange = (id: string, size: BentoSize) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, size } : item
    );

    updateProfile({
      ...profile,
      bento: newItems,
    });
  };

  return (
    <MuuriComponent
      key={size}
      layout={{
        fillGaps: false,
      }}
      dragFixed
      dragEnabled
      dragRelease={{
        duration: 300,
      }}
      onMount={() => {
        blendy.current?.update();
      }}
      layoutOnResize={false}
      layoutDuration={300}
      dragHandle=".handle"
      dragSortPredicate={{
        action: "swap",
        threshold: 20,
      }}
      dragAutoScroll={{
        targets: [
          {
            element: window,
            axis: AutoScroller.AXIS_Y,
          },
        ],
      }}
      dragPlaceholder={{
        enabled: true,
        createElement: function (item) {
          // @ts-expect-error
          const itemElement = item.getElement();
          const element = document.createElement("div");
          element.className = "bg-foreground opacity-30 squircle";
          element.style.width = itemElement.style.width;
          element.style.height = itemElement.style.height;
          return element;
        },
      }}
      onDragEnd={(item) => {
        const grid = item.getGrid();
        const items = grid.getItems().map((item, index) => {
          const { gridSize, ...rest } = item._component.props as BentoItemProps;

          return {
            ...rest,
            order: index + 1,
          };
        });

        updateProfile({
          ...profile,
          bento: items,
        });

        // @ts-expect-error
        grid.refreshItems();
      }}
      containerClass="bento"
      itemClass="bento-item"
      itemVisibleClass="bento-item-shown"
      itemHiddenClass="bento-item-hidden"
      itemDraggingClass="bento-item-dragging"
      itemPositioningClass="bento-item-positioning"
      itemReleasingClass="bento-item-releasing"
      itemPlaceholderClass="bento-item-placeholder"
    >
      {items.map((props) => (
        <BentoItemComponent
          key={props.id}
          {...props}
          gridSize={size}
          onSizeChange={handleSizeChange}
          blendy={blendy}
        />
      ))}
    </MuuriComponent>
  );
};
