import React, { useEffect ,useState} from "react";
import { Link } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchApi";
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
type dataType = {
  items: [
    {
      brandingSettings: {
        channel: {
          country: String;
          description: String;
          keywords: string;
          title: string;
          unsubscribedTrailer: string;
        };
        image: {
          bannerExternalUrl: string;
        };
      };
      contentDetails: {
        relatedPlaylists: {
          likes: string;
          uploads: string;
        };
      };
      id: string;
      kind: string;
      snippet: {
        country: string;
        customUrl: string;
        description: string;
        localized: {
          description: string;
          title: string;
        };
        publishedAt: string;
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
        title: string;
      };
      statistics: {
        hiddenSubscriberCount: boolean;
        subscriberCount: string;
        videoCount: string;
        viewCount: string;
      };
    }
  ];
  kind: String;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
};
const RenderVideo = ({ video }: RenderVideoPropsType) => {
  const [dataChannel, setDataChannel] = useState<dataType>();
  // useEffect(()=>{
  //   console.log(video)
  //   fetchFromAPI(`channels?part=snippet,statistics&id=${video.snippet.channelId}`).then(
  //     (data: any) => {
  //       setDataChannel(data);
  //     })
      
  // },[])
  return (
    <Link
      to={`/video/${video.id.videoId}`}
      key={video.id.videoId}
      className="text-white   overflow-hidden cursor-pointer w-[calc(50%-8px)] md:w-[calc(33%-12px)] lg:w-[calc(25%-16px)] max-w-[320px]"
    >
      <img
        className="max-w-[320px] w-full h-[55%] max-sm:h-[130px] lg:w-full object-fill  hover:opacity-80 rounded"
        src={video.snippet.thumbnails.medium.url}
        alt=""
      />

      <div className="my-2 p-2 flex gap-4 ">
        {/* <div className="w-[28px] h-[28px] ">
          <img
            className="w-full min-w-[28px] min-h-[28px] h-full rounded-full"
            src={dataChannel?.items[0].snippet.thumbnails.medium.url}
            alt=" "
          />
        </div> */}
        <div className="w-full">
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
      </div>
    </Link>
  );
};

export default RenderVideo;
