import { useCallback, useState } from "react";
import type {
  BentoItem,
  BentoItemSize,
  BentoItemType,
} from "~/features/bento/model/bento.type";
import { useProfile } from "~/services/edit-profile/model/profile-provider";

import {
  BentoItemLink2x2,
  BentoItemLink2x4,
  BentoItemLink4x1,
  BentoItemLink4x2,
} from "./variants";
import { Link2Off } from "lucide-react";

const buildFaviconUrl = (url: URL) => {
  // Google Favicon API - высокое качество, автоматически находит лучшую иконку
  return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=256`;
};

const buildDuckDuckGoFaviconUrl = (url: URL) => {
  // DuckDuckGo Icons API - надежный fallback
  return `https://icons.duckduckgo.com/ip3/${url.hostname}.ico`;
};

const buildOgImageUrl = (url: URL) => {
  // Microlink API - получает реальные OG изображения сайтов
  return `https://api.microlink.io/?url=${encodeURIComponent(url.toString())}&screenshot=true&meta=false&embed=screenshot.url`;
};

const buildScreenshotUrl = (url: URL) => {
  // Screenshot API как fallback
  return `https://api.screenshotone.com/take?url=${encodeURIComponent(url.toString())}&viewport_width=1200&viewport_height=630&format=jpeg&access_key=demo`;
};

// Компонент для Favicon с автоматическим fallback
function FaviconImage({
  url,
  alt,
  className,
}: {
  url: URL;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(buildFaviconUrl(url));
  const [useFallback, setUseFallback] = useState(false);

  const handleError = () => {
    if (!useFallback) {
      // Переключаемся на DuckDuckGo Icons API при ошибке
      setUseFallback(true);
      setImgSrc(buildDuckDuckGoFaviconUrl(url));
    }
  };

  return (
    <img src={imgSrc} alt={alt} className={className} onError={handleError} />
  );
}

// Компонент для OG изображения с автоматическим fallback
function OGImage({
  url,
  alt,
  className,
}: {
  url: URL;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(buildOgImageUrl(url));
  const [useFallback, setUseFallback] = useState(false);

  const handleError = () => {
    if (!useFallback) {
      // Переключаемся на Screenshot API при ошибке
      setUseFallback(true);
      setImgSrc(buildScreenshotUrl(url));
    }
  };

  return (
    <img src={imgSrc} alt={alt} className={className} onError={handleError} />
  );
}

export function BentoItemLink({ itemId }: { itemId: string }) {
  const { profile } = useProfile();

  const bentoItem = profile.bento.find(
    (item) => item.id === itemId
  ) as BentoItem<BentoItemType.LINK>;

  if (!bentoItem) return null;
  if (!bentoItem.properties.url_valid)
    return (
      <div className="size-full flex items-center justify-center">
        <Link2Off className="size-14 text-foreground opacity-50" />
      </div>
    );

  const url = new URL(bentoItem.properties.url);

  const faviconImg = (
    <FaviconImage
      url={url}
      className="size-full"
      alt={bentoItem.properties.title}
    />
  );

  const ogImage = (
    <OGImage
      url={url}
      alt={bentoItem.properties.title}
      className="size-full object-cover"
    />
  );

  const Components = useCallback(
    (size: `${BentoItemSize}`) => {
      const components: Record<BentoItemSize, React.ReactNode> = {
        "2x1": null,
        "4x1": (
          <BentoItemLink4x1
            faviconImg={faviconImg}
            title={bentoItem.properties.title}
            url={url}
          />
        ),
        "2x2": (
          <BentoItemLink2x2
            faviconImg={faviconImg}
            title={bentoItem.properties.title}
            url={url}
          />
        ),
        "2x4": (
          <BentoItemLink2x4
            faviconImg={faviconImg}
            title={bentoItem.properties.title}
            url={url}
            ogImg={ogImage}
          />
        ),
        "4x2": (
          <BentoItemLink4x2
            faviconImg={faviconImg}
            title={bentoItem.properties.title}
            url={url}
            ogImg={ogImage}
          />
        ),
        "4x4": (
          <BentoItemLink2x4
            faviconImg={faviconImg}
            title={bentoItem.properties.title}
            url={url}
            ogImg={ogImage}
          />
        ),
      };
      return components[size];
    },
    [bentoItem.size, faviconImg, ogImage, url]
  );

  return (
    <div className="size-full relative flex p-4 group flex-col gap-4 overflow-hidden justify-between">
      {Components(bentoItem.size)}
    </div>
  );
}
