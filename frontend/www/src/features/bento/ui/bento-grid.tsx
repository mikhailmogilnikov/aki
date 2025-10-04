import { AutoScroller, MuuriComponent } from "muuri-react";
import { BentoItemComponent, type BentoItemProps } from "./bento-item/index";
import type { BentoSize } from "../model/bento.type";
import { useBentoSize } from "../model/useBentoSize";
import { sortBy } from "~/shared/lib/utils/sort-by";

import { useProfile } from "~/services/edit-profile/model/profile-provider";

import { CircleQuestionMark } from "lucide-react";
import { useMemo } from "react";

export const BentoGrid = () => {
  const { sizerRef, size } = useBentoSize();

  const { profile } = useProfile();

  return (
    <div className="relative w-full">
      <div
        ref={sizerRef}
        id="grid-sizer"
        className="w-full aspect-square absolute top-0 invisible"
      ></div>
      {size && profile.bento.length > 0 && <BentoGridE size={size} />}

      {profile.bento.length === 0 && (
        <div className="px-2 motion-opacity-in-0">
          <div className="squircle-outline p-4 flex gap-3">
            <CircleQuestionMark className="opacity-50 shrink-0" />
            <p className="font-medium">
              You dont have any blocks on your page now. Add first by clicking
              on the <span className="text-link font-bold">+</span> button in
              the bottom menu.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const BentoGridE = ({ size }: { size: number }) => {
  const { profile, updateProfile } = useProfile();

  const items = useMemo(() => sortBy(profile.bento, "order"), [profile.bento]);

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
          element.className = "bg-foreground opacity-50 squircle";
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
        />
      ))}
    </MuuriComponent>
  );
};
