export const LoadingComp = ({ isFetching }: { isFetching: boolean }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm transition-opacity duration-300 ${isFetching ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <p className="text-card-foreground text-sm">Loading...</p>
    </div>
  );
};
