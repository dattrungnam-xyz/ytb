import React from "react";

import RenderVideo from "./RenderVideo";
import SkeletonVideo from "./SkeletonVideo";
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
  active?: string;
  channelDetail?: boolean;
  scroll?: boolean;
};
const RenderVideos = ({
  videos,
  active,
  channelDetail = false,
  scroll = true,
}: RenderVideosProps) => {
  return (
    <>
      {scroll ? (
        <div className=" h-[calc(100vh-61px)] max-sm:h-[calc(100vh-122px)] overflow-y-auto  w-full pb-4">
          {channelDetail ? (
            <></>
          ) : (
            <>
              <div className="flex my-2 ">
                <p className="text-[white] text-3xl leading-10 mr-[8px]">
                  {active}{" "}
                </p>
                <p className="text-[red] text-3xl leading-10">videos</p>
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-4">
            {
              videos
                .filter((video) => {
                  return video.id.videoId;
                })
                .map((video) => {
                  return <RenderVideo video={video} />;
                })}

           
          </div>
        </div>
      ) : (
        <div className="h-full  overflow-y-auto  w-full pb-4">
          {channelDetail ? (
            <></>
          ) : (
            <>
              <div className="flex my-2 ">
                <p className="text-[white] text-3xl leading-10 mr-[8px]">
                  {active}{" "}
                </p>
                <p className="text-[red] text-3xl leading-10">videos</p>
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-4">
            {/* {videos
              .filter((video) => {
                return video.id.videoId;
              })
              .map((video) => {
                return <RenderVideo loading={loading} video={video} />;
              })} */}

            {
              videos
                .filter((video) => {
                  return video.id.videoId;
                })
                .map((video) => {
                  return <RenderVideo video={video} />;
                })}

          
          </div>
        </div>
      )}
    </>
  );
};

export default RenderVideos;
