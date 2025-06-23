import { AutoScroller, MuuriComponent } from "muuri-react";
import { useState } from "react";
import { Item } from "./bento-item";
import { type BentoItem } from "../model/bento.type";
import { useBentoSize } from "../model/useBentoSize";

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
  const [items, setItems] = useState<BentoItem[]>([
    { id: "1", size: "4x1" },
    { id: "2", size: "2x2" },
    { id: "3", size: "2x4" },
    { id: "4", size: "4x2" },
    { id: "5", size: "4x4" },
    { id: "6", size: "2x1" },
  ]);

  return (
    <MuuriComponent
      dragFixed={false}
      dragEnabled
      dragRelease={{
        duration: 300,
      }}
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
          element.className = "bg-default/50 squircle";
          element.style.width = itemElement.style.width;
          element.style.height = itemElement.style.height;
          return element;
        },
      }}
      onDragEnd={(item) => {
        console.log(item.getGrid());
      }}
    >
      {items.map((props) => (
        <Item key={props.id} {...props} gridSize={size} />
      ))}
    </MuuriComponent>
  );
};
