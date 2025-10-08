import { useEffect } from "react";

export const useAppearRainbow = () => {
  useEffect(() => {
    const content = document.getElementById("content");
    if (!content?.classList.contains("grayscale")) return;

    const rainbowAppearContent = document.getElementById(
      "rainbow-appear-content"
    );

    content?.classList.add("rainbow-appear");
    rainbowAppearContent?.classList.add("rainbow-appear-content");

    rainbowAppearContent?.addEventListener("animationend", () => {
      rainbowAppearContent?.parentElement?.remove();
      content?.classList.remove("rainbow-appear");
      content?.classList.remove("grayscale");
    });
  }, []);
};
