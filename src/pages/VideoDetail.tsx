import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

import { Header } from "../components";
import RenderVideo from "../components/RenderVideo";
import { fetchFromAPI } from "../utils/fetchApi";
type videoProps = {
  snippet: {
    channelId: string;
    channelTitle: string;
    defaultAudioLanguage: string;
    description: string;
    liveBroadcastContent: string;
    localized: {
      description: string;
      title: string;
    };
    publishedAt: string;
    title: string;
  };
  statistics: {
    commentCount: string;
    favoriteCount: string;

    likeCount: string;
    viewCount: string;
  };
};

type videosProps = {
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
const VideoDetail = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState<Array<videosProps>>();
  const [videoDetail, setVideoDetail] = useState<videoProps>();
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
    console.log(videoDetail);
  }, [id]);
  return (
    <div className="h-[100vh] bg-black">
      <Header />
      <div className=" flex gap-4 px-4 max-sm:gap-0 max-sm:px-4">
        <div className="w-[80%] max-sm:w-[100%] max-md:w-[70%] max-lg:w-[75%] ">
          
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="77vh"
            />
          
          <div className="text-white">
            <p className="py-2 px-4 text-white text-lg font-bold">
              {videoDetail?.snippet.title}
            </p>
            <div className="flex justify-between py-1 px-4">
              <div className="flex items-center justify-center">
                <Link
                  to={`/channel/${videoDetail?.snippet.channelId}`}
                  className="mr-1 text-sm  text-white cursor-pointer"
                >
                  {videoDetail?.snippet.channelTitle}
                </Link>
                <BsFillCheckCircleFill
                  style={{ fontSize: "12px", color: "gray" }}
                  color="gray"
                />
              </div>
              <div className="flex ">
                <p className="text-sm">
                  {videoDetail?.statistics.viewCount &&
                    parseInt(
                      videoDetail?.statistics.viewCount
                    ).toLocaleString()}{" "}
                  views
                </p>
                <p className="text-sm ml-4">
                  {" "}
                  {videoDetail?.statistics.likeCount &&
                    parseInt(
                      videoDetail?.statistics.likeCount
                    ).toLocaleString()}{" "}
                  likes
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[calc(20%-16px)] max-h-[calc(100vh-61px)] max-md:max-w-[calc(30%-16px)] max-lg:max-w-[calc(25%-16px)] max-sm:mr-0 max-sm:w-[0px] text-white flex flex-col  overflow-y-auto">
          {videos ? (
            <>
              {videos.map((video) => {
                return (
                  <>
                    <div className="w-full lg:min-h-[200px] md:min-h-[180px]  mb-4 max-sm:hidden cursor-pointer">
                      <RenderVideo video={video} />
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
