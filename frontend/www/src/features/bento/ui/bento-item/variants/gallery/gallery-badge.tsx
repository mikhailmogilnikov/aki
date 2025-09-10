export const GalleryBadge = ({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) => {
  return (
    <div className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-lg text-white px-1.5 py-0.5 rounded-full">
      <p className="text-xs font-medium">
        {currentIndex}/{total}
      </p>
    </div>
  );
};
