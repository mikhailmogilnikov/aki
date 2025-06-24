import { useEffect, useRef } from "react";

import { createBlendy } from "./blendy.dist";
import type { Blendy } from "blendy";

export const useBlendy = () => {
  const blendy = useRef<Blendy | null>(null);

  useEffect(() => {
    blendy.current = createBlendy({ animation: "dynamic" });
  }, []);

  return {
    blendy,
  };
};
