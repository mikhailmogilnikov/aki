import { ArrowUpRightIcon } from "lucide-react";
import { useState } from "react";
import type {
  BentoItem,
  BentoItemType,
} from "~/features/bento/model/bento.type";
import { useProfile } from "~/services/edit-profile/model/profile-provider";

const buildFaviconUrl = (url: URL) => {
  return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
};

const buildOgImageUrl = (url: URL) => {
  // Кодируем URL в Base64 для Google Cloud Storage API
  const base64Url = btoa(url.toString());

  // Формируем URL для creatorspace-public API (с автоматическим fallback на Microlink)
  return `https://storage.googleapis.com/creatorspace-public/sites/ogimages/${base64Url}.jpeg`;
};

const buildMicrolinkOgUrl = (url: URL) => {
  return `https://api.microlink.io/?url=${encodeURIComponent(url.toString())}&screenshot=true&meta=false&embed=screenshot.url`;
};

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
      // Переключаемся на Microlink API при ошибке
      setUseFallback(true);
      setImgSrc(buildMicrolinkOgUrl(url));
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
        <p className="text-sm text-center opacity-50">Empty link</p>
      </div>
    );

  const url = new URL(bentoItem.properties.url);

  const faviconImg = (
    <img
      src={buildFaviconUrl(url)}
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

  return (
    <div className="size-full relative flex p-4 group flex-col gap-4 overflow-hidden justify-between">
      <div className="absolute left-7 z-0 top-7 size-24 flex items-center justify-center opacity-30 blur-xl pointer-events-none">
        {faviconImg}
      </div>

      <div className="flex flex-col gap-3">
        <div className="size-18 rounded-2xl z-10 overflow-hidden flex items-center justify-center shrink-0 bg-background/50 border border-outline">
          {faviconImg}
        </div>

        <div className="absolute top-4 right-4 z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-link duration-300">
          <ArrowUpRightIcon className="size-7" />
        </div>

        <div className="flex flex-col gap-1 z-10">
          <h6 className="text-base font-medium text-start line-clamp-2">
            {bentoItem.properties.title || url.hostname}
          </h6>
          <p className="text-sm text-foreground/50 text-start">
            {url.hostname}
          </p>
        </div>
      </div>

      {(bentoItem.size === "4x4" || bentoItem.size === "2x4") && (
        <div className="overflow-hidden h-full rounded-xl border border-outline">
          {ogImage}
        </div>
      )}
    </div>
  );
}
