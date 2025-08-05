import { BentoGrid } from "~/features/bento/ui/bento-grid";
import { ProfileProvider } from "../model/profile-provider";
import { EditAvatar } from "./avatar";
import { EditName } from "./name";
import { EditDescription } from "./description";

export const Profile = () => {
  return (
    <ProfileProvider>
      <header
        className="flex gap-4 flex-col items-start max-lg:max-w-107 max-lg:px-4 max-lg:mx-auto lg:sticky lg:top-20 lg:h-fit lg:max-w-120 w-full motion-opacity-in-0"
        role="banner"
      >
        <EditAvatar
          className="size-46"
          blurClassName="lg:top-38 lg:left-20 lg:scale-x-210 lg:scale-y-170"
        />
        <EditName />
        <EditDescription />
      </header>

      <section className="w-full max-w-[428px] mx-auto px-[8px] lg:px-0 motion-opacity-in-0">
        <BentoGrid />
      </section>
    </ProfileProvider>
  );
};
