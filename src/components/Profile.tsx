import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const Profile = ({ user }: { user: string }) => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate(0);
    toast.success("Logout successfully!");
  }

  return (
    <>
      <div className="flex gap-4 justify-between items-center mb-2">
        <div className="flex gap-2 items-center ">
          <p className=" font-light text-xs bg-gray-500 px-2 py-1 rounded-full">
            {user[0].toUpperCase()}
          </p>
          <p className="font-light text-sm">{user}</p>
        </div>
        <div>
          <button
            className="cursor-pointer flex gap-2 px-3 rounded-xl py-1.5 bg-[#20212b] text-xs  items-center justify-center text-secondary-foreground font-light"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
