// import { useState } from "react";
// import { BrainIcon } from "../icons/BrainIcon";
// import { Document } from "../icons/DocumentIcon";
// import { Link as LinkIcon } from "../icons/LinkIcon";
// import { PlusIcon } from "../icons/PlusIcon";
// import { ShareIcon } from "../icons/ShareIcon";
// import { Twitter } from "../icons/TwitterIcon";
// import { Video } from "../icons/VideoIcon";
// import { SharePopup } from "../components/SharePopup";
// import { AddContentPopup } from "../components/AddContentPopup";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import axios from "axios";
// import { Profile } from "../components/Profile";
// import { ContentComp } from "../components/ContentComp";
// import { Toaster } from "react-hot-toast";

// export function Videos() {
//   const [openPopup, setOpenPopup] = useState(false);
//   const [shareLink, setShareLink] = useState("");
//   const [openAddContentPopup, setopenAddContentPopup] = useState(false);
//   const { data } = useQuery({
//     queryKey: ["dbData"],
//     queryFn: async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;
//       const res = await axios({
//         method: "get",
//         url: "https://brainly-production-bb1a.up.railway.app/content",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(res.data);
//       return res.data;
//     },
//   });

//   // share brain function
//   function fetchShareBrain() {
//     const token = localStorage.getItem("token");
//     try {
//       axios({
//         method: "post",
//         url: "https://brainly-production-bb1a.up.railway.app/brain/share",
//         headers: { Authorization: `Bearer ${token}` },
//         data: { share: true },
//       }).then((data) => setShareLink(data.data.hash));
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // Fetch content at home, initially

//   const handleOpenAddContentPopup = () => {
//     setopenAddContentPopup(true);
//   };

//   const handleRemoveAddContentPopup = () => {
//     setopenAddContentPopup(false);
//   };

//   const handleOpenPopup = () => {
//     setOpenPopup(true);
//   };

//   const handleRemovePopup = () => {
//     setOpenPopup(false);
//   };

//   return (
//     <div className="font-geist flex h-screen w-screen relative">
//       {/* Sidebar */}
//       <div className="border-r-[0.5px] border-sidebar-border px-4 pr-3 py-4 bg-sidebar-background text-sidebar-foreground fixed h-full flex flex-col justify-between ">
//         {/* Logo Box */}
//         <div>
//           <div className="px-2 flex gap-1 items-center py-2 pr-20 cursor-pointer">
//             <div className="mr-2 p-2 rounded-xl bg-amber-300">
//               <BrainIcon />
//             </div>
//             <h1 className="font-bold text-xl">Second Brain</h1>
//           </div>
//           {/* Menu Box */}
//           <div className=" pl-1 py-2 mt-6 gap-3 flex flex-col">
//             <div className="flex group p-2 px-3 gap-3 items-center rounded-lg cursor-pointer hover:bg-sidebar-hover-background transition-colors">
//               <Twitter />
//               <h2 className="text-sidebar-foreground text-sm font-medium">
//                 Tweets
//               </h2>
//             </div>
//             <div className="flex group p-2 px-3 gap-3 items-center rounded-lg cursor-pointer hover:bg-sidebar-hover-background transition-colors">
//               <Video />
//               <h2 className="text-sidebar-foreground text-sm font-medium">
//                 Videos
//               </h2>
//             </div>
//             <div className="flex group p-2 px-3 gap-3 items-center rounded-lg cursor-pointer hover:bg-sidebar-hover-background transition-colors">
//               <Document
//                 color="text-sidebar-foreground/70"
//                 hover="group-hover:text-sidebar-primary"
//               />
//               <h2 className="text-sidebar-foreground text-sm font-medium">
//                 Documents
//               </h2>
//             </div>
//             <div className="flex group p-2 px-3 gap-3 items-center rounded-lg cursor-pointer hover:bg-sidebar-hover-background transition-colors">
//               <LinkIcon />
//               <h2 className="text-sidebar-foreground text-sm font-medium">
//                 Links
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* Login or Signup */}
//         {data?.user ? (
//           <Profile user={data.user} />
//         ) : (
//           <div className="flex flex-col gap-4">
//             <button className="cursor-pointer flex gap-2 px-5 rounded-xl py-2.5 bg-[#20212b] text-sm font-semibold items-center justify-center text-secondary-foreground ">
//               <Link to={"/login"} className="w-full">
//                 Login
//               </Link>
//             </button>
//             <p className="text-center text-sm text-muted-foreground mb-[-10px]">
//               not registered yet?
//             </p>
//             <button className="cursor-pointer flex gap-2 px-5 rounded-xl py-2.5 bg-[#20212b] text-sm font-semibold items-center justify-center text-secondary-foreground ">
//               <Link to={"/signup"} className="w-full">
//                 {" "}
//                 Signup
//               </Link>
//             </button>
//           </div>
//         )}

//         {/* Profile Icon */}
//         {/* <Profile /> */}
//       </div>
//       {/* Second Column */}
//       <div className="bg-background flex-1 flex text-sidebar-foreground ml-[290px]">
//         {/* Navbar row */}
//         <div className="border-b-[0.5px] border-sidebar-border p-4 flex gap-5 items-center justify-end pr-8 py-6 fixed w-full right-0">
//           <button
//             className="cursor-pointer flex gap-2 px-5 rounded-xl py-2.5 bg-[#20212b] text-sm font-semibold items-center text-secondary-foreground"
//             onClick={() => {
//               fetchShareBrain();
//               handleOpenPopup();
//             }}
//           >
//             <ShareIcon />
//             Share Brain
//           </button>
//           <button
//             className="flex gap-2 px-5 rounded-xl py-2.5 text-sm font-semibold items-center bg-amber-300 text-accent-foreground cursor-pointer"
//             onClick={() => handleOpenAddContentPopup()}
//           >
//             <PlusIcon />
//             Add Content
//           </button>
//         </div>
//         {data?.data ? (
//           <ContentComp data={data.data} />
//         ) : (
//           <div className="h-full flex w-full justify-center items-center">
//             <p>Login or Signup to create your second brain</p>
//           </div>
//         )}
//       </div>
//       <SharePopup
//         openPopup={openPopup}
//         closePopup={handleRemovePopup}
//         shareLink={shareLink}
//         numberOfData={data?.data?.length}
//       />
//       <AddContentPopup
//         openAddContentPopup={openAddContentPopup}
//         closePopup={handleRemoveAddContentPopup}
//       />
//       <Toaster />
//     </div>
//   );
// }
