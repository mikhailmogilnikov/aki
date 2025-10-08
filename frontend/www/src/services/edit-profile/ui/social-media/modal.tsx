import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "~/shared/ui/kit/overlays/adaptive-modal";
import { SectionTitle } from "~/shared/ui/kit/primitives/section-title";
import { useProfile } from "../../model/profile-provider";
import { useMemo, useState } from "react";

import {
  SocialMedia,
  SocialMediaPlatforms,
} from "~/shared/domain/social-media";
import { Save, Trash2 } from "lucide-react";

export function EditSocialMediaModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) {
  const { profile } = useProfile();

  const linkedSocialMedia = useMemo(
    () => profile.social_media,
    [profile.social_media]
  );

  const unlinkedSocialMedia = useMemo(
    () =>
      Object.values(SocialMediaPlatforms).filter(
        (platform) =>
          !profile.social_media.some(
            (socialMedia) => socialMedia.platform === platform
          )
      ),
    [profile.social_media]
  );

  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange}>
      <AdaptiveModalHeader>Edit social media</AdaptiveModalHeader>
      <AdaptiveModalContent>
        <div className="flex flex-col gap-6 py-1 w-full">
          {linkedSocialMedia.length > 0 && (
            <SectionTitle title="Linked">
              {linkedSocialMedia.map((socialMedia) => (
                <LinkedSocialMedia
                  key={socialMedia.platform}
                  platform={socialMedia.platform}
                  slug={socialMedia.slug}
                />
              ))}
            </SectionTitle>
          )}
          {unlinkedSocialMedia.length > 0 && (
            <SectionTitle title="Unlinked">
              {unlinkedSocialMedia.map((platform) => (
                <UnlinkedSocialMedia key={platform} platform={platform} />
              ))}
            </SectionTitle>
          )}
        </div>
      </AdaptiveModalContent>
    </AdaptiveModal>
  );
}

const LinkedSocialMedia = (props: {
  platform: SocialMediaPlatforms;
  slug: string;
}) => {
  const { profile, updateProfile } = useProfile();

  const { name, icon, url } = SocialMedia[props.platform];

  const hostname = new URL(url).hostname;

  const [slug, setSlug] = useState(props.slug);

  const handleSave = () => {
    updateProfile({
      ...profile,
      social_media: [
        ...profile.social_media,
        { platform: props.platform, slug },
      ],
    });
  };

  const handleDelete = () => {
    updateProfile({
      ...profile,
      social_media: profile.social_media.filter(
        (socialMedia) => socialMedia.platform !== props.platform
      ),
    });
  };

  return (
    <div className="squircle-outline px-4 py-3 flex gap-3 justify-between">
      <div className="flex items-center">
        <p className="text-base text-foreground/50">{hostname}/</p>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="text-base font-semibold outline-none placeholder:text-foreground/70"
          placeholder="username"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={slug === props.slug}
          className="bg-default p-2 rounded-full pressable disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          onClick={handleSave}
        >
          <Save className="size-5" />
        </button>
        <button
          className="bg-default p-2 rounded-full pressable"
          onClick={handleDelete}
        >
          <Trash2 size={20} className=" text-danger" />
        </button>
      </div>
    </div>
  );
};

const UnlinkedSocialMedia = ({
  platform,
}: {
  platform: SocialMediaPlatforms;
}) => {
  const { profile, updateProfile } = useProfile();
  const { name, icon, url } = SocialMedia[platform];

  const hostname = new URL(url).hostname;

  const [username, setUsername] = useState("");

  const handleSave = () => {
    updateProfile({
      ...profile,
      social_media: [...profile.social_media, { platform, slug: username }],
    });
  };

  return (
    <div className="squircle-outline px-4 py-3 flex gap-3 justify-between">
      <div className="flex items-center">
        <p className="text-base text-foreground/50">{hostname}/</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-base font-semibold outline-none placeholder:text-foreground/70 w-full"
          placeholder="username"
        />
      </div>
      <button
        disabled={username === ""}
        className="bg-default p-2 rounded-full pressable disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        onClick={handleSave}
      >
        <Save className="size-5" />
      </button>
    </div>
  );
};
