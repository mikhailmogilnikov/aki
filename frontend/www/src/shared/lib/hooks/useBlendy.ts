import { useEffect, useRef } from "react";

import { createBlendy } from "./blendy.dist";
import type { Blendy } from "blendy";
import { createGStore } from "create-gstore";

export const useBlendy = createGStore(() => {
  const blendy = useRef<Blendy | null>(null);

  useEffect(() => {
    blendy.current = createBlendy({ animation: "dynamic" });
  }, []);

  return {
    blendy,
  };
});
