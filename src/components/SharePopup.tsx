import { CancelIcon } from "../icons/CancelIcon";
import { CopyIcon } from "../icons/CopyIcon";
import toast from "react-hot-toast";

type Props = {
  openPopup: boolean;
  shareLink: string;
  numberOfData: number;
  closePopup: () => void;
};

const notify = () => toast("Link copied to clipboard", { duration: 1000 });

export const SharePopup = ({
  openPopup,
  closePopup,
  shareLink,
  numberOfData,
}: Props) => {
  const handleClosePopup = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).id === "modelContainer") {
      closePopup();
    }
  };

  function handleCrossClick() {
    closePopup();
  }

  function copyClipboard() {
    const link = `http://localhost:5173${shareLink}`;
    navigator.clipboard.writeText(link).then(() => {
      notify();
      closePopup();
    });
  }

  return (
    <div
      id="modelContainer"
      onClick={handleClosePopup}
      className={`fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm transition-opacity duration-300 ${openPopup ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        className={`p-8 flex flex-col gap-6 rounded-xl text-card-foreground bg-[#202038] max-w-125 transition-opacity duration-300 ${openPopup ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Share Your Second Brain</h3>
          <button className=" cursor-pointer">
            <CancelIcon
              color="text-sidebar-foreground/70"
              hover="group-hover:text-sidebar-primary"
              // @ts-ignore
              clickHandler={handleCrossClick}
            />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Share your entire collection of notes, documents, videos with
            others. They will be able to import your content into their own
            Second Brain.
          </p>
          <button
            className="rounded-md w-full bg-dark-primary flex justify-center p-3 gap-3 cursor-pointer items-center text-card-foreground"
            onClick={copyClipboard}
          >
            <CopyIcon
              color="text-sidebar-foreground/70"
              hover="group-hover:text-sidebar-primary"
            />
            <span>Share Brain</span>
          </button>
          <p className="text-center text-sm text-muted-foreground">
            {numberOfData} items will be shared
          </p>
        </div>
      </div>
    </div>
  );
};
