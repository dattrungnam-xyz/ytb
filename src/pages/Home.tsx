import React, { useState, useEffect } from "react";

import { Skeleton } from "@mui/material";

import { Header, RenderVideos, Sidebar, Loading } from "../components";
import { fetchFromAPI } from "../utils/fetchApi";
import SkeletonVideo from "../components/SkeletonVideo";
type itemProps = {
  id: { kind: string; videoId: string };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    title: string;
    thumbnails: {
      default: {
        url: string;
        width?: Number;
        height?: Number;
      };
      medium: {
        url: string;
        width?: Number;
        height?: Number;
      };
      high: {
        url: string;
        width?: Number;
        height?: Number;
      };
    };
  };
};
const Home = () => {
  const [active, setActive] = useState<string>("New");
  const [loading, setLoading] = useState<Boolean>(false);
  const [item, setItem] = useState<Array<itemProps>>([]);

  const handleActive = (title: string) => {
    setActive(title);
  };

  useEffect(() => {
    setLoading(true);
    fetchFromAPI(`search?part=snippet&q=${active}`)
      .then((data: any) => {
        setItem(data.items);
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return (
    <>
      <Header />
      <div className="flex max-sm:flex-col px-2 gap-4 bg-[#000000]">
        <Sidebar active={active} handleActive={handleActive} />
        <div className="bg-[black] flex-1 flex items-center justify-center overflow-y-auto pr-2">
          {/* <Skeleton variant="rectangular" width={210} height={118} sx={{ bgcolor: 'grey.200' }} />
           <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" /> */}
          {loading ? (
            <div className="w-full flex flex-wrap gap-4 items-center justify-center">
            {loading &&
              Array(50).fill(undefined).map((item) => {
                return <SkeletonVideo />;
              })}
          </div>
          ) : (
            //   <SkeletonTheme baseColor="#ff0707" highlightColor="#fff">
            //   <p>
            //     <Skeleton count={3} />
            //   </p>
            // </SkeletonTheme>
            //     <>
            // <Skeleton count={5} />
            // <Skeleton height={30} />
            //     </>
            <RenderVideos active={active} videos={item} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
