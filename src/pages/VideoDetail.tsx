import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import { useParams, Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton/Skeleton";

import { Header } from "../components";
import RenderVideo from "../components/RenderVideo";
import { fetchFromAPI } from "../utils/fetchApi";
import SkeletonVideo from "../components/SkeletonVideo";
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
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    ).then(()=>{
      setLoading(false);
    })
    setLoading(true);
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    ).then(()=>{
      setLoading(false);
    });
    
    console.log(videoDetail);
  }, [id]);
  return (
    <div className="h-[100vh] bg-black">
      <Header />
      <div className=" flex gap-4 px-4 max-sm:gap-0 max-sm:px-4">
        <div className="w-[80%] max-sm:w-[100%] max-md:w-[70%] max-lg:w-[75%] ">
          <div className="w-full h-[77vh] overflow-hidden ">
            {loading ? (
              <Skeleton
                height="100%"
                variant="rounded"
                width="100%"
                sx={{ bgcolor: "grey.900" }}
              />
            ) : (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
              />
            )}
          </div>

          <div className="text-white">
            {loading ? (
              <div className=" rounded overflow-hidden">
                <Skeleton
                  height={50}
                  width="100%"
                  sx={{ bgcolor: "grey.900" }}
                />
              </div>
            ) : (
              <p className="py-2 px-4 text-white text-lg font-bold">
                {videoDetail?.snippet.title}
              </p>
            )}
            {!loading && (
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
                      ).toLocaleString()}
                    views
                  </p>
                  <p className="text-sm ml-4">
                    {videoDetail?.statistics.likeCount &&
                      parseInt(
                        videoDetail?.statistics.likeCount
                      ).toLocaleString()}
                    likes
                  </p>
                </div>
              </div>
            )}
            {loading && (
              <div className="flex flex-row justify-between">
                <div>
                  <Skeleton
                    height={30}
                    width={160}
                    sx={{ bgcolor: "grey.900" }}
                  />
                </div>
                <div className="flex gap-4">
                  <Skeleton
                    height={30}
                    width={100}
                    sx={{ bgcolor: "grey.900" }}
                  />
                  <Skeleton
                    height={30}
                    width={100}
                    sx={{ bgcolor: "grey.900" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-[calc(20%-16px)] h-[calc(100vh-61px)] max-md:w-[calc(30%-16px)] max-lg:w-[calc(25%-16px)] max-sm:mr-0 max-sm:w-[0px] text-white flex flex-col  overflow-y-auto">
          {loading ? (
            <div className="w-full">
              {Array(3)
                .fill(undefined)
                .map((item) => {
                  return (
                    <div className="w-full mb-4">
                      <Skeleton
                        width="100%"
                        variant="rounded"
                        height={140}
                        sx={{ bgcolor: "grey.900" }}
                      />
                      <Skeleton
                        width="100%"
                        height={60}
                        sx={{ bgcolor: "grey.900"}}
                      />
                      <Skeleton
                        width="20%"
                        height={30}
                        sx={{ bgcolor: "grey.900",mt:-1 }}
                      />
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              {videos?.map((video) => {
                return (
                  <>
                    <div className="w-full lg:min-h-[200px] md:min-h-[180px]  mb-4 max-sm:hidden cursor-pointer">
                      <RenderVideo video={video} />
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
