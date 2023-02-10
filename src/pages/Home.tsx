import React, { useState, useEffect } from "react";

import { Header, RenderVideos, Sidebar, Loading } from "../components";
import { fetchFromAPI } from "../utils/fetchApi";
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
    setLoading(true);
    setActive(title);
  };

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${active}`).then((data) => {
      setItem(data.items);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return (
    <>
      <Header />
      <div className="flex max-sm:flex-col px-2 gap-4 bg-[#000000]">
        <Sidebar active={active} handleActive={handleActive} />
        <div className="bg-[black] flex-1 flex items-center justify-center">
          {loading ? (
            <Loading />
          ) : (
            <RenderVideos active={active} videos={item} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
