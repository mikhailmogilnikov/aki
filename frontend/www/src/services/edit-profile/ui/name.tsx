import { useProfile } from "../model/profile-provider";

export const EditName = () => {
  const { profile, updateProfile } = useProfile();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateProfile({ ...profile, name: e.target.value });
  };

  return (
    <textarea
      value={profile.name}
      onChange={handleChange}
      className="text-[2.1rem] overflow-hidden font-bold px-1 mt-4 z-1 outline-none field-sizing-content w-full resize-none"
      placeholder="Your name"
    />
  );
};
