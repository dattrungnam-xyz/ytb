import React from "react";
import { Link } from "react-router-dom";
type videoProps = {
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
type RenderVideosProps = {
  videos: Array<videoProps>;
  active: string;
};
const RenderVideos = ({ videos, active }: RenderVideosProps) => {
  return (
    <>
      <div className=" h-[calc(100vh-64px)] max-sm:h-[calc(100vh-122px)] overflow-y-auto  w-full">
        <div className="flex my-2">
          <p className="text-[white] text-3xl leading-10 mr-[8px]">{active} </p>
          <p className="text-[red] text-3xl leading-10">videos</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => {
            return (
              <Link
                to={`/video/${video.id.videoId}`}
                key={video.id.videoId}
                className="text-white bg-[#1e1e1e] rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  className="w-[320px] h-[140px]  object-fill  hover:opacity-80"
                  src={video.snippet.thumbnails.medium.url}
                  alt=""
                />

                <div className="my-2 p-2 ">
                  <p className="truncate-2-line overflow-hidden h-[40px] text-sm">
                    {video.snippet.title}
                  </p>
                  <Link
                    to={`/channel/${video.snippet.channelId}`}
                    className="mt-2 text-xs"
                  >
                    {video.snippet.channelTitle}
                  </Link>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RenderVideos;
