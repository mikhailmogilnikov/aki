import type {
  BentoItem,
  BentoItemType,
} from "~/features/bento/model/bento.type";
import { useProfile } from "~/services/edit-profile/model/profile-provider";

import { useRefresh } from "muuri-react";
import { useEffect, useRef } from "react";

export function FullscreenDescription({ itemId }: { itemId: string }) {
  const { profile, updateProfile } = useProfile();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const bentoItem = profile.bento.find(
    (item) => item.id === itemId
  ) as BentoItem<BentoItemType.DESCRIPTION>;

  useRefresh([bentoItem.properties.content]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
      const length = textRef.current.value.length;
      textRef.current.setSelectionRange(length, length);
    }
  }, [textRef]);

  if (!bentoItem) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBentoItem = {
      ...bentoItem,
      properties: { ...bentoItem.properties, content: e.target.value },
    };

    const newBento = profile.bento.map((item) =>
      item.id === itemId ? newBentoItem : item
    );

    updateProfile({ ...profile, bento: newBento });
  };

  return (
    <textarea
      ref={textRef}
      style={{ opacity: bentoItem.properties.opacity }}
      className="text-base w-full outline-none resize-none field-sizing-content"
      placeholder="Enter description..."
      value={bentoItem.properties.content}
      onChange={handleChange}
    />
  );
}
