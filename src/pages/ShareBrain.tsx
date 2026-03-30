import { BrainIcon } from "../icons/BrainIcon";
import { Document } from "../icons/DocumentIcon";
import { Link as LinkIcon } from "../icons/LinkIcon";
import { Twitter } from "../icons/TwitterIcon";
import { Video } from "../icons/VideoIcon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ContentComp } from "../components/ContentComp";
import { useParams } from "react-router";
import { useState } from "react";
import { HomeIcon } from "../icons/HomeIcon";

export function ShareBrain() {
  const [filter, setFiletr] = useState("Home"); // "Videos", 'Tweets","Documents", "Links"

  const { userid } = useParams();
  const { isPending, data } = useQuery({
    queryKey: ["shareBrainData"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `https://brainly-production-bb1a.up.railway.app/brain/${userid}`,
      });
      console.log(res.data.contents);
      return res.data;
    },
  });

  return (
    <div className="font-geist flex h-screen w-screen relative">
      {/* Sidebar */}
      <div className="border-r-[0.5px] border-sidebar-border px-4 pr-3 py-4 bg-sidebar-background text-sidebar-foreground fixed h-full flex flex-col justify-between ">
        {/* Logo Box */}
        <div>
          <div className="px-2 flex gap-1 items-center py-2 pr-20 cursor-pointer">
            <div className="mr-2 p-2 rounded-xl bg-amber-300">
              <BrainIcon />
            </div>
            <h1 className="font-bold text-xl">Second Brain</h1>
          </div>
          {/* Menu Box */}
          <div className=" pl-1 py-2 mt-6 gap-3 flex flex-col">
            <div
              className={`flex group p-2 px-3 gap-3 items-center rounded-lg cursor-pointer hover:bg-sidebar-hover-background transition-colors ${filter == "Home" ? "bg-sidebar-active-background" : ""}`}
              onClick={() => setFiletr("Home")}
            >
              <HomeIcon />
              <h2 className="text-sidebar-foreground text-sm font-medium">
                Home
              </h2>
            </div>
            <div
              className={`flex group p-2 px-3 gap-3 items-center rounded-lg cursor-pointer hover:bg-sidebar-hover-background transition-colors ${filter == "Tweets" ? "bg-sidebar-active-background" : ""}`}
              onClick={() => setFiletr("Tweets")}
            >
              <Twitter />
              <h2 className="text-sidebar-foreground text-sm font-medium">
                Tweets
              </h2>
            </div>
            <div
              className={`flex group p-2 px-3 gap-3 items-center rounded-lg cursor-pointer hover:bg-sidebar-hover-background transition-colors ${filter == "Videos" ? "bg-sidebar-active-background" : ""}`}
              onClick={() => setFiletr("Videos")}
            >
              <Video />
              <h2 className="text-sidebar-foreground text-sm font-medium">
                Videos
              </h2>
            </div>
            <div
              className={`flex group p-2 px-3 gap-3 items-center rounded-lg cursor-pointer hover:bg-sidebar-hover-background transition-colors ${filter == "Documents" ? "bg--sidebar-active-background" : ""}`}
            >
              <Document
                color="text-sidebar-foreground/70"
                hover="group-hover:text-sidebar-primary"
              />
              <h2 className="text-sidebar-foreground text-sm font-medium">
                Documents
              </h2>
            </div>
            <div className="flex group p-2 px-3 gap-3 items-center rounded-lg cursor-pointer hover:bg-sidebar-hover-background transition-colors">
              <LinkIcon />
              <h2 className="text-sidebar-foreground text-sm font-medium">
                Links
              </h2>
            </div>
          </div>
        </div>

        {data ? (
          <div className="flex gap-4 justify-between items-center mb-2">
            <div className="flex gap-2 items-center ">
              <p className=" font-light text-xs bg-gray-500 px-2 py-1 rounded-full">
                {data.username[0].toUpperCase()}
              </p>
              <p className="font-light text-sm">{data.username}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* Second Column */}
      <div className="bg-background flex-1 flex text-sidebar-foreground ml-72.5">
        {isPending ? (
          <div className="h-full flex w-full justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : data ? (
          <ContentComp data={data.contents} filter={filter} />
        ) : (
          <div className="h-full flex w-full justify-center items-center">
            <p>Ask your friend to create second brain</p>
          </div>
        )}
      </div>
    </div>
  );
}
