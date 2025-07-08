import { useProfile } from "../model/profile-provider";

export const EditName = () => {
  const { profile, updateProfile } = useProfile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfile({ ...profile, name: e.target.value });
  };

  return (
    <input
      type="text"
      value={profile.name}
      onChange={handleChange}
      className="text-4xl font-bold px-2 mt-4 z-1 outline-none w-full"
      placeholder="Your name"
    />
  );
};
