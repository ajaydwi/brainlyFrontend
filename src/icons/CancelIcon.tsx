export const CancelIcon = ({
  color,
  hover,
  // @ts-ignore
  clickHandler,
}: {
  color: string;
  hover: string;
}) => {
  const classes = `lucide lucide-twitter w-4 h-4 ${color} ${hover}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={classes}
      onClick={clickHandler}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};
