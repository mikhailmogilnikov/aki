export const PortalOverlay = () => {
  return <div className="fixed inset-0 z-50">
    <div className="absolute inset-0 bg-background/50 backdrop-blur-lg z-1 fade-in animate-in duration-100" />
  </div>;
};