import { ArrowUpRightIcon } from "lucide-react";
import { cn } from "~/shared/lib/utils/cn";

interface BentoItemLinkFaviconProps {
  faviconImg: React.ReactNode;
  faviconLightClassName?: string;
  arrowUpRightClassName?: string;
}

const BentoItemDefaultAbsoluteItems = ({
  faviconImg,
  faviconLightClassName,
  arrowUpRightClassName,
}: BentoItemLinkFaviconProps) => {
  return (
    <>
      <div
        className={cn(
          "absolute left-7 z-0 top-7 size-24 flex items-center justify-center opacity-30 blur-xl pointer-events-none",
          faviconLightClassName
        )}
      >
        {faviconImg}
      </div>

      <div
        className={cn(
          "absolute top-4 right-4 z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-link duration-300",
          arrowUpRightClassName
        )}
      >
        <ArrowUpRightIcon className="size-7" />
      </div>
    </>
  );
};

interface BentoItemLinkDefaultProps extends BentoItemLinkFaviconProps {
  title: string;
  url: URL;
}

export function BentoItemLink4x1({
  faviconImg,
  title,
  url,
}: BentoItemLinkDefaultProps) {
  return (
    <>
      <BentoItemDefaultAbsoluteItems
        faviconImg={faviconImg}
        faviconLightClassName="left-14 top-8"
      />
      <div className="flex gap-3  h-full">
        <div className="h-full aspect-square rounded-2xl z-10 overflow-hidden flex items-center justify-center shrink-0 bg-background/50 border border-outline">
          {faviconImg}
        </div>

        <div className="flex flex-col gap-1 z-10 justify-center mr-6">
          <h6 className="text-base font-medium text-start line-clamp-2">
            {title || url.hostname}
          </h6>
          <p className="text-sm text-foreground/50 text-start">
            {url.hostname}
          </p>
        </div>
      </div>
    </>
  );
}

export function BentoItemLink2x2({
  faviconImg,
  title,
  url,
}: BentoItemLinkDefaultProps) {
  return (
    <>
      <BentoItemDefaultAbsoluteItems faviconImg={faviconImg} />

      <div className="flex flex-col gap-3 justify-between h-full">
        <div className="size-18 rounded-2xl z-10 overflow-hidden flex items-center justify-center shrink-0 bg-background/50 border border-outline">
          {faviconImg}
        </div>

        <div className="flex flex-col gap-1 z-10">
          <h6 className="text-base font-medium text-start line-clamp-2">
            {title || url.hostname}
          </h6>
          <p className="text-sm text-foreground/50 text-start">
            {url.hostname}
          </p>
        </div>
      </div>
    </>
  );
}

interface BentoItemLinkOgProps extends BentoItemLinkDefaultProps {
  ogImg: React.ReactNode;
}

export function BentoItemLink2x4({
  faviconImg,
  title,
  url,
  ogImg,
}: BentoItemLinkOgProps) {
  return (
    <>
      <BentoItemDefaultAbsoluteItems faviconImg={faviconImg} />

      <div className="flex flex-col gap-3">
        <div className="size-18 rounded-2xl z-10 overflow-hidden flex items-center justify-center shrink-0 bg-background/50 border border-outline">
          {faviconImg}
        </div>

        <div className="flex flex-col gap-1 z-10">
          <h6 className="text-base font-medium text-start line-clamp-2">
            {title || url.hostname}
          </h6>
          <p className="text-sm text-foreground/50 text-start">
            {url.hostname}
          </p>
        </div>
      </div>

      <div className="overflow-hidden aspect-[1.91/1] rounded-xl border border-outline">
        {ogImg}
      </div>
    </>
  );
}

export function BentoItemLink4x2({
  faviconImg,
  title,
  url,
  ogImg,
}: BentoItemLinkOgProps) {
  return (
    <>
      <BentoItemDefaultAbsoluteItems
        faviconImg={faviconImg}
        arrowUpRightClassName="bg-black/10 text-white rounded-full p-1 backdrop-blur-lg top-2 right-2 border border-white/10 hidden"
      />

      <div className="flex gap-8 h-full">
        <div className="flex flex-col w-[40%] gap-3 h-full justify-between">
          <div className="size-18 rounded-2xl z-10 overflow-hidden flex items-center justify-center shrink-0 bg-background/50 border border-outline">
            {faviconImg}
          </div>

          <div className="flex flex-col gap-1 z-10">
            <h6 className="text-base font-medium text-start line-clamp-2">
              {title || url.hostname}
            </h6>
            <p className="text-sm text-foreground/50 text-start">
              {url.hostname}
            </p>
          </div>
        </div>

        <div className="overflow-hidden aspect-[1.91/1] rounded-xl border border-outline w-full">
          {ogImg}
        </div>
      </div>
    </>
  );
}
