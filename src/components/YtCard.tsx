import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Document } from "../icons/DocumentIcon";
import { Twitter } from "../icons/TwitterIcon";
import { Video } from "../icons/VideoIcon";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// @ts-ignore
export const YtCard = ({ item }) => {
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
            {item.type == "youtube" ? (
              <Video />
            ) : item.type == "twitter" ? (
              <Twitter />
            ) : (
              <Document
                color="text-primary"
                hover="group-hover:text-sidebar-primary"
              />
            )}
          </div>
          <h3 className="font-semibold text-md">{item.title}</h3>
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
        <iframe
          className="w-full"
          src={item.link
            .replace("watch", "embed")
            .replace("?v=", "/")
            .replace("&")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
