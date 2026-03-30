import { useForm } from "react-hook-form";
import { CancelIcon } from "../icons/CancelIcon";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

type Props = {
  openAddContentPopup: boolean;
  closePopup: () => void;
};

const notify = () => toast.success("created successfully!");

export const AddContentPopup = ({ openAddContentPopup, closePopup }: Props) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleClosePopup = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).id === "modelContainer") {
      closePopup();
    }
  };
  // @ts-ignore
  const handleFormSubmit = async (data) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      await axios({
        method: "post",
        url: "https://brainly-production-bb1a.up.railway.app/content",
        headers: { Authorization: `Bearer ${token}` },
        data: { type: data.type, title: data.title, link: data.link },
      });
      notify();
      closePopup();
      reset();
      queryClient.invalidateQueries({ queryKey: ["dbData"] });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error("failed!, Please try again");
    }
  };

  return (
    <div
      id="modelContainer"
      onClick={handleClosePopup}
      className={`fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm transition-opacity duration-300 ${openAddContentPopup ? "opacity-100 visible" : "opacity-0 invisible"} `}
    >
      <div
        className={`p-8 flex flex-col gap-6 rounded-xl text-card-foreground bg-[#202038] max-w-125 w-125 transition-opacity duration-300 ${openAddContentPopup ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Add Content</h3>
          <button className=" cursor-pointer">
            <CancelIcon
              color="text-sidebar-foreground/70"
              hover="group-hover:text-sidebar-primary"
            />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <form
            onSubmit={handleSubmit((data) => {
              handleFormSubmit(data);
            })}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="type" className="text-md">
                Type
              </label>
              <select
                {...register("type", { required: true })}
                id=""
                className="text-sm  border px-2 py-2 rounded-lg border-border
              bg-[#28283d] cursor-pointer"
              >
                <option value="youtube" className="cursor-pointer">
                  Youtube
                </option>
                <option value="tweet">Twitter</option>
                <option value="document">Document</option>
                <option value="any">Any</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-md">
                Title
              </label>
              <input
                {...register("title", { required: true })}
                id=""
                className="
              border px-2 py-2 rounded-lg border-border
              bg-[#28283d]
              "
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-md">
                Link
              </label>

              <input
                {...register("link", { required: true })}
                id=""
                className="
              border px-2 py-2 rounded-lg border-border
              bg-[#28283d] h-fit"
              />
            </div>
            <button
              disabled={isLoading ? true : false}
              type="submit"
              className={`rounded-md w-full bg-[#2020cc] flex justify-center p-3 gap-3 cursor-pointer items-center text-card-foreground `}
            >
              <span>{isLoading ? "Adding... " : "Add Content"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
