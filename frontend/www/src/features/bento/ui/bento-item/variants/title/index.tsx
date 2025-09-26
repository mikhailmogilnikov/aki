interface BentoItemTitleProps {
  itemId: string;
  isFullscreen: boolean;
}

export const BentoItemTitle = ({
  itemId,
  isFullscreen,
}: BentoItemTitleProps) => {
  return (
    <div className="size-full relative flex items-end justify-start pb-1.5">
      {isFullscreen ? (
        <input
          type="text"
          className="text-xl font-bold w-full outline-none"
          placeholder="Title"
        />
      ) : (
        <h3 className="text-xl font-bold">Title</h3>
      )}
    </div>
  );
};
