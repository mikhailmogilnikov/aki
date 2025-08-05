import { useMemo, useRef } from "react";

export function useObjectRef(forwardedRef: any) {
  const objRef = useRef(null);

  return useMemo(
    () => ({
      get current() {
        return objRef.current;
      },
      set current(value) {
        objRef.current = value;
        if (typeof forwardedRef === "function") {
          forwardedRef(value);
        } else if (forwardedRef) {
          forwardedRef.current = value;
        }
      },
    }),
    [forwardedRef]
  );
}
