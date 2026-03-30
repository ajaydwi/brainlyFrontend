import { TwitterCard } from "./TwitterCard";
import { YtCard } from "./YtCard";

// @ts-ignore
export const ContentComp = ({ data, filter }) => {
  return (
    <>
      <div className="px-10 py-5 w-full  overflow-y-scroll scrollbar bg-background mt-22.5">
        {/* Heading Row */}
        <div className="">
          <h1 className="text-4xl font-bold">
            {/* Check for share brian */}
            {filter == "Home" ? "All Notes" : filter}
          </h1>
          <p className="text-sm mt-2 text-muted-foreground">
            Organize and manage your knowledge
          </p>{" "}
        </div>
        {/* Content Box Row */}
        <div className="flex gap-4 mt-10 flex-wrap ">
          {data // @ts-ignore
            ? data.map((item) => {
                if (filter) {
                  if (filter == "Videos") {
                    if (item.type == "youtube") {
                      return <YtCard item={item} />;
                    }
                  }
                  if (filter == "Tweets") {
                    if (item.type == "tweet") {
                      return <TwitterCard item={item} />;
                    }
                  }
                }
                if (filter == "Home") {
                  if (item.type == "youtube") {
                    return <YtCard item={item} />;
                  }
                  if (item.type == "tweet") {
                    return <TwitterCard item={item} />;
                  }
                }
              })
            : ""}
        </div>
      </div>
    </>
  );
};
