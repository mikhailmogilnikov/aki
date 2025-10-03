import type { BentoItemOptionsProps } from "../../../options";
import { BentoItemSize } from "../../../options/size";
import { BentoItemDelete } from "../../../options/delete";
import { useProfile } from "~/services/edit-profile/model/profile-provider";
import { SectionTitle } from "~/shared/ui/kit/primitives/section-title";
import type {
  BentoItem,
  BentoItemType,
} from "~/features/bento/model/bento.type";
import { CheckCircle, XCircle } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  url: z.url(),
});

export function BentoItemLinkOptions({
  id,
  onSizeChange,
  onDelete,
}: BentoItemOptionsProps) {
  const { profile, updateBentoItem } = useProfile();

  const bentoItem = profile.bento.find(
    (item) => item.id === id
  ) as BentoItem<BentoItemType.LINK>;
  const size = bentoItem?.size;

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const url = e.target.value;
    if (url.length > 100) return;
    const validatedUrl = schema.safeParse({ url });

    updateBentoItem(id, {
      ...bentoItem?.properties,
      url,
      url_valid: validatedUrl.success,
    });
  };

  const handleTitleChange = (title: string) => {
    updateBentoItem(id, { ...bentoItem?.properties, title });
  };

  return (
    <>
      <BentoItemSize
        sizes={["4x1", "2x2", "2x4", "4x2", "4x4"]}
        activeSize={size}
        onSelect={onSizeChange}
      />
      <hr className="border-outline" />
      <SectionTitle
        title="URL"
        className="gap-1"
        sideContent={
          bentoItem?.properties.url_valid ? (
            <CheckCircle className="size-4 text-success" />
          ) : (
            <XCircle className="size-4 text-danger" />
          )
        }
      >
        <input
          type="text"
          value={bentoItem?.properties.url}
          onChange={handleUrlChange}
          placeholder="https://example.com"
          className="w-full bg-foreground/10 rounded-full py-2 px-4 outline-none"
        />
      </SectionTitle>

      {bentoItem?.properties.url_valid && (
        <SectionTitle title="Title" className="gap-1">
          <input
            type="text"
            disabled={!bentoItem?.properties.url_valid}
            value={bentoItem?.properties.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Title of the link"
            className="w-full bg-foreground/10 rounded-full py-2 px-4 outline-none disabled:opacity-50"
          />
        </SectionTitle>
      )}
      <hr className="border-outline" />
      <BentoItemDelete id={id} onDelete={onDelete} />
    </>
  );
}
