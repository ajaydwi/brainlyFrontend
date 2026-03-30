import { Link, useNavigate } from "react-router";
import { BrainIcon } from "../icons/BrainIcon";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function login(data: { name: string; password: string }) {
    setIsLoading(true);

    try {
      const res = await axios({
        url: "https://brainly-production-bb1a.up.railway.app/login",
        method: "post",
        data: {
          //@ts-ignore
          username: data?.name,
          //@ts-ignore
          password: data?.password,
        },
      });
      setIsLoading(false);
      console.log("res", res);
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      // @ts-ignore
      console.log("err", err);
      // @ts-ignore
      console.log("err", err.response.data);
      // @ts-ignore
      toast.error(err.response.data.msg);

      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="m-3  flex gap-1 items-center   cursor-pointer fixed">
        <Link to={"/"}>
          <div className="p-2 rounded-xl bg-amber-300">
            <BrainIcon />
          </div>
        </Link>
      </div>

      <div className="font-geist flex items-center justify-center h-screen w-screen  bg-background text-secondary-foreground">
        <form
          onSubmit={handleSubmit((data) => {
            // @ts-ignore
            login(data);
          })}
          className="flex flex-col gap-6 w-100"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              {...register("name", { required: true })}
              id=""
              className=" border px-3 py-2 rounded-lg border-border
            bg-[#28283d]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Password</label>
            <input
              {...register("password", { required: true })}
              id=""
              className=" border px-3 py-2 rounded-lg border-border
            bg-[#28283d]"
            />
          </div>
          <div className="self-start ">
            <button
              disabled={isLoading ? true : false}
              type="submit"
              className="rounded-md w-full bg-[#1e1ec7] flex justify-center p-3 gap-3 cursor-pointer items-center text-card-foreground px-8 disabled:bg-[#4747b3]"
            >
              {isLoading ? "wait..." : "login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
