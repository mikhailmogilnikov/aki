import { AutoScroller, MuuriComponent } from "muuri-react";
import { useState } from "react";
import { Item, type BentoItemProps } from "./bento-item";
import { type BentoItem, type BentoSize } from "../model/bento.type";
import { useBentoSize } from "../model/useBentoSize";
import { sortBy } from "~/shared/lib/utils/sort-by";
import { LocalStorageService } from "~/shared/lib/services/storage";

const BentoItems: BentoItem[] = [
  { id: "1", size: "4x1", order: 1, style: "shadow" },
  { id: "2", size: "2x2", order: 2, style: "outline" },
  { id: "3", size: "2x4", order: 3, style: "shadow" },
  { id: "4", size: "4x2", order: 4, style: "outline" },
  { id: "5", size: "4x4", order: 5, style: "shadow" },
  { id: "6", size: "2x1", order: 6, style: "plain" },
];

export const BentoGrid = () => {
  const { sizerRef, size } = useBentoSize();

  return (
    <div className="relative w-full">
      <div
        ref={sizerRef}
        id="grid-sizer"
        className="w-full aspect-square absolute top-0 invisible m-2"
      ></div>
      {size && <BentoGridE size={size} />}
    </div>
  );
};

const BentoGridE = ({ size }: { size: number }) => {
  const initialItems =
    LocalStorageService.getItem("bento", "safe") || BentoItems;

  const [items, setItems] = useState<BentoItem[]>(
    sortBy(initialItems, "order")
  );

  const handleSizeChange = (id: string, size: BentoSize) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, size } : item
    );

    setItems(newItems);
    LocalStorageService.setItem("bento", newItems);
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

        LocalStorageService.setItem("bento", items);
        setItems(items);
        // @ts-expect-error
        grid.refreshItems();
        console.log(grid);
      }}
    >
      {items.map((props) => (
        <Item
          key={props.id}
          {...props}
          gridSize={size}
          onSizeChange={handleSizeChange}
        />
      ))}
    </MuuriComponent>
  );
};
