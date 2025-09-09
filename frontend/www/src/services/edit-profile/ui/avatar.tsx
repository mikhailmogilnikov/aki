import clsx from "clsx";
import { useProfile } from "../model/profile-provider";
import { useRef, useState } from "react";
import { AnimatePresence } from "~/shared/ui/utils/AnimatePresense";
import { Lamp, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/shared/ui/kit/overlays/react-tooltip";

export const EditAvatar = ({
  className,
  blurClassName,
}: {
  className: string;

  blurClassName: string;
}) => {
  const { profile, updateProfile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [src, setSrc] = useState<string | null>(
    "https://avatars.githubusercontent.com/u/125604210?v=4"
  );

  const handleDelete = () => {
    setSrc(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSrc(URL.createObjectURL(file));
    }
  };

  const handleToggleBlur = () => {
    updateProfile({
      ...profile,
      theme: {
        ...profile.theme,
        show_avatar_blur: !profile.theme.show_avatar_blur,
      },
    });
  };

  return (
    <div className={clsx("rounded-full relative", className)}>
      <input
        accept="image/*"
        multiple={false}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {src ? (
        <img
          key={src}
          loading="eager"
          onClick={() => fileInputRef.current?.click()}
          src={src}
          alt={profile.name}
          className="size-full object-cover rounded-full select-none cursor-pointer motion-opacity-in-0 shadow-xl"
          draggable={false}
        />
      ) : (
        <>
          <button
            type="button"
            className="size-full border-3 border-dashed hover:bg-default/50 active:bg-default/80 transition-colors border-outline rounded-full select-none cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            Add avatar
          </button>
        </>
      )}

      <AnimatePresence
        show={!!src && profile.theme.show_avatar_blur}
        className="absolute top-18 left-10 size-full -z-1"
        inClass="motion-opacity-in-0 motion-scale-in-0"
        outClass="motion-opacity-out-0 motion-scale-out-0"
      >
        {src && (
          <img
            loading="eager"
            src={src}
            aria-hidden={true}
            draggable={false}
            className={clsx(
              "size-full will-change-transform object-cover select-none rounded-full blur-2xl opacity-35 scale-x-175 scale-y-130",
              blurClassName
            )}
          />
        )}
      </AnimatePresence>

      <AnimatePresence
        show={!!src}
        className="absolute top-0 left-0 motion-duration-200 motion-ease-in-out-cubic"
        inClass="motion-opacity-in-0 motion-scale-in-0"
        outClass="motion-opacity-out-0 motion-scale-out-0"
      >
        <Tooltip>
          <TooltipTrigger>
            <button
              className="size-11 bg-default backdrop-blur-md rounded-full pressable flex items-center justify-center"
              onClick={handleDelete}
            >
              <Trash2 className="size-5 text-danger" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete avatar</p>
          </TooltipContent>
        </Tooltip>
      </AnimatePresence>

      <AnimatePresence
        show={!!src}
        className="absolute top-0 right-0 motion-duration-200 motion-ease-in-out-cubic"
        inClass="motion-opacity-in-0 motion-scale-in-0"
        outClass="motion-opacity-out-0 motion-scale-out-0"
      >
        <Tooltip>
          <TooltipTrigger>
            <button
              className={clsx(
                "size-11 rounded-full transition-colors pressable flex items-center justify-center",
                {
                  "bg-foreground text-background":
                    profile.theme.show_avatar_blur,
                  "bg-default text-foreground": !profile.theme.show_avatar_blur,
                }
              )}
              onClick={handleToggleBlur}
            >
              <Lamp className="size-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle avatar blur</p>
          </TooltipContent>
        </Tooltip>
      </AnimatePresence>
    </div>
  );
};
