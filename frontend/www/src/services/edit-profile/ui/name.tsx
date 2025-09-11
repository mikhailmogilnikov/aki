import { useProfile } from "../model/profile-provider";
import TextareaAutosize from "react-textarea-autosize";

export const EditName = () => {
  const { profile, updateProfile } = useProfile();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateProfile({ ...profile, name: e.target.value });
  };

  return (
    <TextareaAutosize
      value={profile.name}
      onChange={handleChange}
      className="text-[2.1rem] overflow-hidden font-bold px-2 mt-4 z-1 outline-none w-full resize-none"
      placeholder="Your name"
    />
  );
};
