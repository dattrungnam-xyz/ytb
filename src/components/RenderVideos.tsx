import React, { useEffect } from "react";

type RenderVideos = {
  videos: Array<any>;
};
const RenderVideos = ({ videos }: RenderVideos) => {
  useEffect(() => {}, []);
  return (
    <div>
      aaa
      {/* {videos.map((video) => {
        return (
          <div key={video.id} className="text-white">
            {video?.id}
          </div>
        );
      })} */}
    </div>
  );
};

export default RenderVideos;
