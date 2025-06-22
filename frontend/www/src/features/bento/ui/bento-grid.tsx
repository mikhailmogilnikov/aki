import { useBento } from "../model/useBento";
import { BentoItem } from "./bento-item";

export const BentoGrid = () => {
  const { handleUpdateLayout } = useBento();

  return (
    <div className="grid-root w-full">
      <div className="grid-sizer-half"></div>
      <div className="grid-sizer-full"></div>
      <BentoItem size="2x2" onSizeChange={handleUpdateLayout}></BentoItem>
      <BentoItem size="2x4" onSizeChange={handleUpdateLayout}></BentoItem>
      <BentoItem size="2x2" onSizeChange={handleUpdateLayout}></BentoItem>
      <BentoItem size="4x2" onSizeChange={handleUpdateLayout}></BentoItem>
      <BentoItem size="4x4" onSizeChange={handleUpdateLayout}></BentoItem>
    </div>
  );
};
