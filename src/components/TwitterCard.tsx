import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Document } from "../icons/DocumentIcon";
import { useQueryClient } from "@tanstack/react-query";
import { Twitter } from "../icons/TwitterIcon";
import toast from "react-hot-toast";

// @ts-ignore
export const TwitterCard = ({ item }) => {
  const link = item.link.replace("x.com", "twitter.com").split("?")[0];

  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");
  const handleDeleteItem = async () => {
    try {
      await axios({
        method: "delete",
        url: `https://brainly-production-bb1a.up.railway.app/delete/${item._id}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted!");
      queryClient.invalidateQueries({ queryKey: ["dbData"] });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-6 px-5 rounded-2xl bg-card text-card-foreground min-w-64 max-w-100 h-fit">
      {/* Top bar */}
      <div className="mb-7 flex justify-between items-center gap-10">
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-card-icon rounded-xl ">
            <Twitter />
          </div>
          <h3 className="font-semibold text-md"> {item.title}</h3>
        </div>
        <button className="mr-2">
          <DeleteIcon
            color="text-sidebar-foreground/70"
            hover="group-hover:text-sidebar-primary"
            // @ts-ignore
            handleDeleteItem={handleDeleteItem}
          />
        </button>
      </div>
      <div className="w-full">
        <blockquote className="twitter-tweet">
          {/* <a href="https://twitter.com/username/status/2036052367729360904"></a> */}
          {/* https://x.com/SwaDotDev/status/2036052367729360904 */}
          <a href={link}></a>
        </blockquote>
      </div>
    </div>
  );
};
