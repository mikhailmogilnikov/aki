import { useProfile } from "../model/profile-provider";
import TextareaAutosize from "react-textarea-autosize";

export const EditDescription = () => {
  const { profile, updateProfile } = useProfile();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateProfile({ ...profile, description: e.target.value });
  };

  return (
    <TextareaAutosize
      value={profile.description}
      onChange={handleChange}
      className="text-lg text-muted-foreground px-2 z-1 outline-none resize-none field-sizing-content w-full"
      placeholder="Add bio..."
    />
  );
};
