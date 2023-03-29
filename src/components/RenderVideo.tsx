import React from "react";
import { Link } from "react-router-dom";
type RenderVideoPropsType = {
  video: {
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
};


const RenderVideo = ({ video }: RenderVideoPropsType) => {
  return (
    <Link
      to={`/video/${video.id.videoId}`}
      key={video.id.videoId}
      className="text-white bg-[#1e1e1e]  overflow-hidden cursor-pointer"
    >
      <img
        className="w-[320px] h-[55%] max-sm:h-[130px] object-fill  hover:opacity-80"
        src={video.snippet.thumbnails.medium.url}
        alt=""
      />

      <div className="my-2 p-2 ">
        <p className="truncate-2-line overflow-hidden h-[40px] text-sm">
          {video.snippet.title}
        </p>
        <Link
          to={`/channel/${video.snippet.channelId}`}
          className="mt-2 text-xs text-[gray]"
        >
          {video.snippet.channelTitle}
        </Link>
      </div>
    </Link>
  );
};

export default RenderVideo;
